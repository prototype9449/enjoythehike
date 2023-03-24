import { Box, Typography } from "@mui/material";
import { WeatherIcon } from "../icons/Icon";

type WeekDayWeatherCardProps = {
  weekDay: string;
  temperature: {
    day: number;
    night: number;
  };
  icon: string;
  date: string;
};
const WeekDayWeatherCard = ({ weekDay, temperature, date, icon }: WeekDayWeatherCardProps) => {
  return (
    <Box pt={2} width="100%" display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h6">
        {weekDay} {date}
      </Typography>
      <Box mt={1} mb={1} mr={2} ml={2}>
        <WeatherIcon key={icon} width={100} id={icon} animated={false} />
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
          {temperature.day}°C
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
          {temperature.night}°C
        </Typography>
      </Box>
    </Box>
  );
};

type WeekWeatherProps = {
  data: WeekWeatherPayload[];
};

export type WeekWeatherPayload = {
  date: string;
  weekDay: string;
  temperature: { day: number; night: number };
  icon: string;
};

export const WeekWeather = ({ data }: WeekWeatherProps) => {
  const lines = [...new Array(6)].map((x, i) => (
    <Box
      width="1px"
      key={i}
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
