import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { QueryClient, QueryClientProvider, useIsFetching } from "react-query";
import { SnackbarProvider } from 'notistack';

import "./App.css";
import { WeatherWidget } from "./WeatherWidget";
import { BookingForm } from "./BookingForm/BookingForm";
import { AppBar, Box, LinearProgress, Paper, Tab, Tabs } from "@mui/material";
import { Trails } from "./Trails/Trails";
import { Bookings } from "./Bookings/Bookings";

const queryClient = new QueryClient();

type BookingTasProps = {
  value: number;
  onChange: (v: number) => void;
};

const BookingTabs = ({ value, onChange }: BookingTasProps) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onChange(newValue);
  };

  return (
    <Tabs variant="scrollable" indicatorColor="primary" textColor="inherit" value={value} onChange={handleChange} centered>
      <Tab sx={{ width: "300px", textTransform: "none", fontSize: "18px" }} label="Find a trail" />
      <Tab sx={{ width: "300px", textTransform: "none", fontSize: "18px" }} label="My bookings" />
    </Tabs>
  );
};

const MainApp = () => {
  const [value, setValue] = React.useState(0);

  const isFetching = useIsFetching({ predicate: (q) => ["trails", "bookings"].some((x) => q.queryKey.includes(x)) });

  return (
    <Box width="100%">
      <Box width="1280px" ml="auto" mr="auto" mt="100px" mb="200px">
        <WeatherWidget />
        <LinearProgress sx={{ height: "5px", visibility: isFetching ? "visible" : "hidden", mt: 2 }} />
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Paper elevation={5} sx={{ mb: 2 }}>
            <BookingTabs value={value} onChange={(v) => setValue(v)} />
          </Paper>
          {value === 0 && <BookingForm />}
          {value === 1 && <Bookings />}
        </Box>
      </Box>
    </Box>
  );
};

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider
          style={{
            fontSize: '18px'
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
        <MainApp />
        </SnackbarProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}

export default App;
