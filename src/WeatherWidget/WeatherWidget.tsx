import { Box, Paper } from "@mui/material";
import { places } from "../BookingForm/constants";
import { TodayWidgetCard } from "./TodayWidgetCard";
import { useCallback, useMemo, useState } from "react";
import { WeekWeather } from "./WeekDayWeatherCard";
import { TrailPlace } from "../BookingForm/types";

export const WeatherWidget = () => {
  const [openNum, setOpened] = useState(-1);

  const handleOpenClick = useCallback((place: TrailPlace) => {
    setOpened((num) => {
      if (places.indexOf(place) === num) {
        return -1;
      } else {
        return places.indexOf(place);
      }
    });
  }, []);

  const todayWidgets = useMemo(() => {
    return places.map((p, i) => (
      <TodayWidgetCard
        shouldGrey={i !== openNum && openNum > -1}
        isOpened={i === openNum}
        onOpenClick={handleOpenClick}
        key={p}
        place={p}
        description={"clear sky"}
        feelsLike={30}
        humidity={20}
        temperature={12}
        wind={20}
      />
    ));
  }, [handleOpenClick, openNum]);

  const weekWidgets = useMemo(() => {
    return <div></div>;
  }, []);

  return (
    <Paper sx={{ mb: 2, borderRadius: "16px 16px 0 0", overflow: 'hidden' }}>
      <Box sx={{ display: "flex" }}>{todayWidgets}</Box>
      <Box maxHeight={openNum !== -1 ? "400px" : 0} overflow="hidden" sx={{ transition: "max-height 0.25s ease-in" }}>
        <WeekWeather place={places[openNum]} />
      </Box>
    </Paper>
  );
};
