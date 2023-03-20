import { Box, Button, LinearProgress, Paper, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { findTrails, getBookings } from "../core/trail";

const NoBookings = () => {
  return (
    <Box display="flex" alignItems={"center"} justifyContent={"start"} pt={5} ml={10}>
      <Typography variant="h5">You have not booked a trail yet</Typography>
    </Box>
  );
};

export type BookedTrail = {
  name: string;
  climb: number;
  ratio: number;
  distance: number;
  level: string;
  rank: number;
  image: string;
  cost: number;
  hours: number;
  date: string;
  taxi: {
    number: string;
    arrive: string;
  };
  lunch: {
    pick: string;
    dish: string;
  };
  hotel: {
    name: string;
    checkIn: string;
    checkOut: string;
    dateStart: string;
    dateEnd: string;
  };
};

export const Bookings = () => {
  const { data, error, isFetching, isFetched } = useQuery(["bookings"], getBookings, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const bookings = data?.map(({ name, date, cost, hotel, hours, climb, image, level, lunch, rank, taxi, ratio, distance }) => {
    return (
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Box display="flex" justifyContent={"space-between"}>
          <Box display={"flex"}>
            <Box width="180px" height="120px">
              <img src={image} height="100%" alt={name} />
            </Box>
            <Box pl={2}>
              <Typography variant="h5" mb={1}>
                {name}
                <Typography sx={{ ml: 1 }} component="span" variant="body1">
                  ({date})
                </Typography>
              </Typography>
              <Typography variant="body1">
                {hotel.dateStart} {hotel.checkIn} — {hotel.dateEnd} {hotel.checkOut}
                <Typography component={"a"} href="#ffd" sx={{ ml: 1 }} variant="body1" fontWeight={"bold"}>
                  {hotel.name}
                </Typography>
              </Typography>
              <Typography variant="body1">
                Your lunch is{" "}
                <Typography component="span" fontWeight="bold">
                  {lunch.dish}
                </Typography>
                . Pick it at {lunch.pick}
              </Typography>
              <Typography variant="body1">
                Taxi will pick you at{" "}
                <Typography component="span" fontWeight="bold">
                  {taxi.arrive}
                </Typography>
                . Plate number is {taxi.number}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Button variant="contained">Cancel</Button>
          </Box>
        </Box>
        <Box>
          <Typography sx={{ mt: 2 }} variant="body1">
            The final cost is{" "}
            <Typography component="span" fontWeight="bold" variant="body1">
              {cost}$
            </Typography>
            . Don't forget to take a credit card.
          </Typography>
        </Box>
      </Paper>
    );
  });

  return (
    <Box width="100%" minHeight="300px">
      <Box sx={{ width: "100%" }}>
        <LinearProgress sx={{ height: "5px", visibility: isFetching ? "visible" : "hidden" }} />
      </Box>
      {bookings}
    </Box>
  );
};
