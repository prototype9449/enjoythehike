import React, { useCallback, useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { setDefaultOptions } from "@exness-tech/mock-xhr-request";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { QueryClient, QueryClientProvider, useIsFetching, useIsMutating, useQueryClient } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import "./fonts/orange_juice.ttf";

import "./App.css";
import { WeatherWidget } from "./WeatherWidget";
import { BookingForm, ChosenDay } from "./BookingForm/BookingForm";
import { Box, CircularProgress, Paper, Tab, Tabs, Typography } from "@mui/material";
import { Bookings } from "./Bookings/Bookings";
import { getBookings } from "./core/trail";
import dayjs, { Dayjs } from "dayjs";
import { TrailPlace } from "../gateway/src/types";

setDefaultOptions({
  baseUrl: "http://localhost:3002",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

type BookingTasProps = {
  value: number;
  onChange: (v: number) => void;
};

const BookingTabs = ({ value, onChange }: BookingTasProps) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onChange(newValue);
  };

  return (
    <Tabs variant="scrollable" indicatorColor="primary" textColor="inherit" value={value} onChange={handleChange}>
      <Tab sx={{ width: "300px", textTransform: "none", fontSize: "18px" }} label="Find a trail" />
      <Tab sx={{ width: "300px", textTransform: "none", fontSize: "18px" }} label="My bookings" />
    </Tabs>
  );
};

const MainApp = () => {
  const [value, setValue] = useState(0);
  const [chosenDay, setChosenDay] = useState<ChosenDay>({ place: "any", day: dayjs("2023-03-30") } as const);

  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["bookings"],
      queryFn: getBookings,
    });
  }, [queryClient]);

  const isFetching = useIsFetching({
    predicate: (q) => q.state.status === "loading" || (q.queryKey.includes("trails") && q.state.fetchStatus === "fetching"),
  });
  const isMutating = useIsMutating({
    predicate: (q) => q.state.status === "loading" && !q.options.mutationKey?.includes("fetchStatus"),
  });

  const handleDayClick = useCallback((place: TrailPlace, date: Dayjs) => {
    setChosenDay({
      day: date,
      place,
    });
  }, []);

  return (
    <Box width="100%">
      <Typography textAlign="center" mt="50px" variant="h1" fontFamily="OrangeJuice" color={"#3457e6d4"}>
        Enjoy the hike
      </Typography>
      <Box width="1280px" ml="auto" mr="auto" mt="50px" mb="200px">
        <WeatherWidget onDayClick={handleDayClick} />
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Paper elevation={5} sx={{ mb: 2 }}>
            <BookingTabs value={value} onChange={(v) => setValue(v)} />
          </Paper>
          {value === 0 && <BookingForm chosenDay={chosenDay} />}
          {value === 1 && <Bookings />}
        </Box>
      </Box>
      {(isFetching || isMutating) && <CircularProgress size={60} sx={{ position: "fixed", right: 70, bottom: 70 }} />}
    </Box>
  );
};

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider
          style={{
            fontSize: "18px",
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <MainApp />
        </SnackbarProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}

export default App;
