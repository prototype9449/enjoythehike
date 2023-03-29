import { Box, Paper, Typography, useTheme } from "@mui/material";

import { TodayWidgetCard } from "./TodayWidgetCard";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WeekWeather } from "./WeekDayWeatherCard";
import { places } from "../constants";
import { useGetTodayWeather, useGetWeekWeather, useIsWeatherLoading } from "../core/queries/weather";
import { TodayWeather, TrailPlace } from "../../gateway/src/types";
import dayjs, { Dayjs } from "dayjs";
import { IconMoodCry } from "@tabler/icons-react";

const ErrorDescription = ({ isError, error }: { isError: boolean; error: Error | string }) => {
  const theme = useTheme();
  const color = isError ? theme.palette.error.main : theme.palette.text.secondary;
  const errorMessage = isError
    ? // @ts-ignore
      error?.response?.data?.message || error?.message || "Weather is currently now available"
    : undefined;
  return (
    <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
      <Typography sx={{ mr: 2 }} variant="h4" color={color}>
        {errorMessage}
      </Typography>
      <IconMoodCry size={50} color={theme.palette.text.secondary}/>
    </Box>
  );
};

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value; //assign the value of ref to the argument
  }, [value]); //this code will run when the value of 'value' changes

  return ref.current; //in the end, return the current ref value.
}

type Props = {
  onDayClick: (place: TrailPlace, date: Dayjs) => void;
};

type TransformedTodayWeather = {
  place: TrailPlace;
  data?: TodayWeather;
};

const transformData = (data: (TodayWeather | undefined)[]): TransformedTodayWeather[] => {
  return places.map((place) => {
    const resp = data.find((d) => d?.place === place);

    return {
      place,
      data: resp,
    };
  });
};

export const WeatherWidget = ({ onDayClick }: Props) => {
  const [openNum, setOpened] = useState(-1);

  const previous = usePrevious(openNum);

  const { isError, data, error, isFetched } = useGetTodayWeather();

  const currentPlace = places[openNum] || (previous && places[previous]) || "Limassol";

  const { weekData, weekRefetch } = useGetWeekWeather(currentPlace);

  const handleOpenClick = useCallback((place: TrailPlace) => {
    setOpened((num) => {
      if (places.indexOf(place) === num) {
        return -1;
      } else {
        return places.indexOf(place);
      }
    });
  }, []);

  useEffect(() => {
    if (openNum !== -1) {
      weekRefetch();
    }
  }, [openNum]);

  const finalData = transformData(data || []);

  const todayWidgets = useMemo(() => {
    return finalData?.map(({ place, data }, i) => (
      <TodayWidgetCard
        shouldGrey={i !== openNum && openNum > -1}
        isOpened={i === openNum}
        onOpenClick={handleOpenClick}
        key={place}
        place={place}
        data={data}
      />
    ));
  }, [data, handleOpenClick, openNum]);

  const isWeatherLoading = useIsWeatherLoading();

  const handleDayClick = useCallback(
    (place: TrailPlace, i: number) => {
      const date = dayjs("2023-03-30").add(i, "day");
      onDayClick(place, date);
    },
    [onDayClick]
  );

  return (
    <>
      <Paper sx={{ mb: 2, borderRadius: "0", overflow: "hidden" }}>
        <Box sx={{ display: "flex", height: "391px" }}>
          {(isWeatherLoading && !isFetched) || isError ? (
            <Box height="391px" width="100%">
              {error ? <ErrorDescription isError={isError} error={error} /> : null}
            </Box>
          ) : (
            todayWidgets
          )}
        </Box>
        <Box maxHeight={openNum !== -1 ? "400px" : 0} overflow="hidden" sx={{ transition: "max-height 0.25s ease-in" }}>
          <WeekWeather data={weekData || []} place={currentPlace} onClick={handleDayClick} />
        </Box>
      </Paper>
    </>
  );
};
