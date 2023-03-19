import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "react-query";

import "./App.css";
import { WeatherWidget } from "./WeatherWidget";
import { BookingForm } from "./BookingForm/BookingForm";
import { AppBar, Box, Paper, Tab, Tabs } from "@mui/material";
import { Trails } from "./Trails/Trails";

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

function App() {
  const [value, setValue] = React.useState(0);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <Box width="100%">
          <Box width="1280px" ml="auto" mr="auto" mt="200px" mb="200px">
            <WeatherWidget />
            <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
              <Paper elevation={5} sx={{ mb: 2 }}>
                <BookingTabs value={value} onChange={(v) => setValue(v)} />
              </Paper>
              {value === 0 && (
                <>
                  <BookingForm />
                  <Trails />
                </>
              )}
            </Box>
          </Box>
        </Box>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}

export default App;
