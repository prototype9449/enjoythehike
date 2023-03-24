import { Box, LinearProgress, Paper, Typography } from "@mui/material";

import { TodayWidgetCard } from "./TodayWidgetCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { WeekWeather } from "./WeekDayWeatherCard";
import { useQuery, useIsFetching } from "@tanstack/react-query";
import { getTodayWeather, getWeekWeather } from "../core/weather";
import { places, TrailPlace } from '../types'

const ErrorDescription = ({ error }: { error: unknown }) => {
  return error ? (
    <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
      <Typography variant="h4">Weather is currently not available</Typography>
    </Box>
  ) : null;
};

export const WeatherWidget = () => {
  const [openNum, setOpened] = useState(-1);

  const { isError, data, error, isFetched } = useQuery(["today-weather"], getTodayWeather, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const {
    data: weekData,
    //isFetching: weekIsFetching,
    refetch: weekRefetch,
  } = useQuery(
    ["week-weather", openNum],
    () => {
      const city = data?.[openNum].place;
      // @ts-ignore
      return getWeekWeather(city);
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: false,
    }
  );

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

  const isFetching = useIsFetching({ predicate: (q) => ["week-weather", "today-weather"].some((x) => q.queryKey.includes(x)) });

  return (
    <>
      <LinearProgress sx={{ height: "5px", visibility: isFetching ? "visible" : "hidden" }} />
      <Paper sx={{ mb: 2, borderRadius: "0", overflow: "hidden" }}>
        <Box sx={{ display: "flex", height: "391px" }}>
          {(isFetching && !isFetched) || isError ? (
            <Box height="391px" width="100%">
              <ErrorDescription error={error} />
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
