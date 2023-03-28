import { Box, Paper, Typography } from "@mui/material";

import { TodayWidgetCard } from "./TodayWidgetCard";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WeekWeather } from "./WeekDayWeatherCard";
import { places } from "../constants";
import { useGetTodayWeather, useGetWeekWeather, useIsWeatherLoading } from "../core/queries/weather";
import { TrailPlace } from "../../gateway/src/types";

const ErrorDescription = ({ error }: { error: Error | string }) => {
  const message = typeof error === "string" ? error : error.message ? error.message : "Weather is currently not available";
  return (
    <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
      <Typography variant="h4">{message}</Typography>
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

export const WeatherWidget = () => {
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

  const todayWidgets = useMemo(() => {
    return data?.map(({ place, forecast, temperature, description, wind, humidity, feelsLike }, i) => (
      <TodayWidgetCard
        shouldGrey={i !== openNum && openNum > -1}
        isOpened={i === openNum}
        onOpenClick={handleOpenClick}
        key={place}
        place={place}
        description={description}
        forecast={forecast}
        feelsLike={feelsLike}
        humidity={humidity}
        temperature={temperature}
        wind={wind}
      />
    ));
  }, [data, handleOpenClick, openNum]);

  const isWeatherLoading = useIsWeatherLoading();

  return (
    <>
      <Paper sx={{ mb: 2, borderRadius: "0", overflow: "hidden" }}>
        <Box sx={{ display: "flex", height: "391px" }}>
          {(isWeatherLoading && !isFetched) || isError ? (
            <Box height="391px" width="100%">
              {error ? <ErrorDescription error={error} /> : null}
            </Box>
          ) : (
            todayWidgets
          )}
        </Box>
        <Box maxHeight={openNum !== -1 ? "400px" : 0} overflow="hidden" sx={{ transition: "max-height 0.25s ease-in" }}>
          <WeekWeather data={weekData || []} />
        </Box>
      </Paper>
    </>
  );
};
