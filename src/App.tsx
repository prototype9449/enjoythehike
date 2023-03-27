import React, { useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { QueryClient, QueryClientProvider, useIsFetching, useIsMutating, useQueryClient } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

import "./App.css";
import { WeatherWidget } from "./WeatherWidget";
import { BookingForm } from "./BookingForm/BookingForm";
import { Box, CircularProgress, Paper, Tab, Tabs } from "@mui/material";
import { Bookings } from "./Bookings/Bookings";
import { getBookings } from "./core/trail";

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
  const [value, setValue] = React.useState(0);

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

  return (
    <Box width="100%">
      <Box width="1280px" ml="auto" mr="auto" mt="100px" mb="200px">
        <WeatherWidget />
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Paper elevation={5} sx={{ mb: 2 }}>
            <BookingTabs value={value} onChange={(v) => setValue(v)} />
          </Paper>
          {value === 0 && <BookingForm />}
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
