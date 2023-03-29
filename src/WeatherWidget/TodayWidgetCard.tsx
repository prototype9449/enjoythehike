import { Box, Button, Typography } from "@mui/material";
import { WeatherIcon } from "../icons/Icon";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { memo, useMemo } from "react";
import { TodayWeather, TrailPlace } from "../../gateway/src/types";
import { IconCircleOff } from "@tabler/icons-react";

type Props = {
  isOpened: boolean;
  onOpenClick: (place: TrailPlace) => void;
  shouldGrey: boolean;
  place: TrailPlace;
  data?: TodayWeather;
};

const NoData = () => {
  return (
    <Box m="auto" display="flex" alignItems="center">
      <Typography sx={{ mr: 2 }} variant="h4">
        No data
      </Typography>
      <IconCircleOff size={35} />
    </Box>
  );
};

const placeHolder = ' --- '

const Weather = ({ place, temperature, forecast, description, wind, humidity, feelsLike }: TodayWeather) => {
  const memoIcon = useMemo(() => (forecast ? <WeatherIcon width={100} id={forecast} animated={true} /> : "-"), [forecast]);

  return (
    <Box width="300px" p={2} pb={0}>
      <Box mb={1} justifyContent="center">
        <Typography variant="h4">{place || "-"}</Typography>
      </Box>
      <Box>{memoIcon}</Box>
      <Box m={2}>
        <Typography variant="h5">{temperature || placeHolder}°C</Typography>
        <Typography variant="h6">{description || placeHolder}</Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box>
          <Typography variant="body1">Wind</Typography>
          <Typography variant="h6">{wind || placeHolder} fps</Typography>
        </Box>
        <Box>
          <Typography variant="body1">Humidity</Typography>
          <Typography variant="h6">{humidity || placeHolder}%</Typography>
        </Box>
        <Box>
          <Typography variant="body1">Feels like</Typography>
          <Typography variant="h6">{feelsLike || placeHolder}°C</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const TodayWidgetCard = memo(({ place, data, isOpened, onOpenClick, shouldGrey }: Props) => {
  const onClick = () => {
    if (data) {
      onOpenClick(place);
    }
  };

  return (
    <Button
      onClick={onClick}
      fullWidth
      disabled={!data}
      sx={{
        color: "inherit",
        position: "relative",
        textTransform: "none",
        flex: "1",
        display: "flex",
        justifyContent: "space-between",
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
      {data ? <Weather {...data} /> : <NoData />}
      <Box sx={{ mt: 2 }} width="100%">
        {isOpened ? <IconChevronUp size={30} color=" grey" /> : <IconChevronDown size={30} color=" grey" />}
      </Box>
    </Button>
  );
});
