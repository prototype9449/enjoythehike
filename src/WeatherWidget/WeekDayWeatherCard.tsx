import { TrailPlace } from "../BookingForm/types";
import { Box, Typography } from "@mui/material";
import { WeatherIcon } from "../icons/Icon";
import { useMemo } from "react";

type WeekDayWeatherCardProps = {
  weekDay: string;
  temperatureDay: number;
  temperatureNight: number;
  icon: string;
};
const WeekDayWeatherCard = ({ weekDay, temperatureDay, temperatureNight, icon }: WeekDayWeatherCardProps) => {
  return (
    <Box pt={2} width="100%" display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h5">{weekDay}</Typography>
      <Box mt={1} mb={1} mr={2} ml={2}>
        <WeatherIcon width={50} id={icon} animated={false} />
      </Box>
      <Box
        textAlign="center"
        width="100%"
        pt={2}
        pb={2}
        sx={{
          backgroundColor: "#DBDBDB",
          opacity: "0.5",
        }}
      >
        <Typography color="black" variant="body1">
          {temperatureDay}°C
        </Typography>
      </Box>
      <Box
        textAlign="center"
        width="100%"
        pt={2}
        pb={2}
        sx={{
          backgroundColor: "#011270",
          opacity: "0.5",
        }}
      >
        <Typography color="white" variant="body1">
          {temperatureNight}°C
        </Typography>
      </Box>
    </Box>
  );
};

type WeekWeatherProps = {
  place: TrailPlace;
};

function generateRandomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const icons = [
  "clear-day",
  "extreme-day",
  "extreme-fog",
  "fog-day",
  "overcast-day",
  "partly-cloudy-day",
  "thunderstorms-day",
  "thunderstorms-day-rain",
];

const getTemp = () => generateRandomInteger(20, 30);
const getIcon = () => icons[generateRandomInteger(0, icons.length - 1)];

const getData = () => [
  { weekDay: "Monday", temperatureDay: getTemp(), temperatureNight: getTemp(), icon: getIcon() },
  { weekDay: "Tuesday", temperatureDay: getTemp(), temperatureNight: getTemp(), icon: getIcon() },
  { weekDay: "Wednesday", temperatureDay: getTemp(), temperatureNight: getTemp(), icon: getIcon() },
  { weekDay: "Thursday", temperatureDay: getTemp(), temperatureNight: getTemp(), icon: getIcon() },
  { weekDay: "Friday", temperatureDay: getTemp(), temperatureNight: getTemp(), icon: getIcon() },
  { weekDay: "Saturday", temperatureDay: getTemp(), temperatureNight: getTemp(), icon: getIcon() },
  { weekDay: "Sunday", temperatureDay: getTemp(), temperatureNight: getTemp(), icon: getIcon() },
];

export const WeekWeather = ({ place }: WeekWeatherProps) => {
  const data = useMemo(() => {
    return getData();
  }, [place]);

  const lines = [...new Array(6)].map((x, i) => (
    <Box
      width="1px"
      sx={{
        backgroundColor: "lightgrey",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: `calc(100% / 7 * ${i + 1})`,
      }}
    ></Box>
  ));

  return (
    <Box display="flex" justifyContent="space-between" width="100%" position="relative" borderTop="1px solid lightgrey">
      {data.map((x) => (
        <WeekDayWeatherCard key={x.weekDay} {...x} />
      ))}
      {lines}
    </Box>
  );
};
