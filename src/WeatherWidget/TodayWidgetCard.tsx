import { Box, Button, IconButton, Typography } from "@mui/material";
import { TrailPlace } from "../BookingForm/types";
import { WeatherIcon } from "../icons/Icon";
import { IconChevronDown, IconChevronUp, IconFoldDown, IconFoldUp } from "@tabler/icons-react";
import { memo, useMemo } from "react";

export type TodayWeather = {
  place: TrailPlace;
  temperature: number;
  description: string;
  wind: number;
  humidity: number;
  feelsLike: number;
  forecast: string;
};

type Props = {
  isOpened: boolean;
  onOpenClick: (place: TrailPlace) => void;
  shouldGrey: boolean;
} & TodayWeather;

export const TodayWidgetCard = memo(
  ({ place, temperature, forecast, description, wind, humidity, feelsLike, isOpened, onOpenClick, shouldGrey }: Props) => {
    const onClick = () => {
      onOpenClick(place);
    };

    const memoIcon = useMemo(() => <WeatherIcon width={100} id={forecast} animated={true} />, [forecast]);

    return (
      <Button
        onClick={onClick}
        fullWidth
        sx={{
          color: 'inherit',
          position: "relative",
          textTransform: 'none',
          flex: "1",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Box
          position="absolute"
          top={0}
          bottom={0}
          right={0}
          left={0}
          sx={{
            transition: "opacity 0.6s ease, background-color 0.6s ease",
            pointerEvents: shouldGrey ? "none" : "auto",
            backgroundColor: shouldGrey ? "grey" : "transparent",
            opacity: shouldGrey ? 0.3 : 1,
          }}
        />
        <Box minWidth="300px" p={4} pb={0}>
          <Box mb={2} justifyContent="center">
            <Typography variant="h3">{place}</Typography>
          </Box>
          <Box>{memoIcon}</Box>
          <Box m={2}>
            <Typography variant="h4">{temperature}°C</Typography>
            <Typography variant="h5">{description}</Typography>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Box>
              <Typography variant="body1">Wind</Typography>
              <Typography variant="h5">{wind} fps</Typography>
            </Box>
            <Box>
              <Typography variant="body1">Humidity</Typography>
              <Typography variant="h5">{humidity}%</Typography>
            </Box>
            <Box>
              <Typography variant="body1">Feels like</Typography>
              <Typography variant="h5">{feelsLike}°C</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 2 }} width="100%">
          {isOpened ? <IconChevronUp size={30} color=" grey" /> : <IconChevronDown size={30} color=" grey" />}
        </Box>
      </Button>
    );
  }
);
