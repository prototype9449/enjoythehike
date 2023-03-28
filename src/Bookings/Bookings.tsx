import { Box, Button, CircularProgress, Paper, Typography, useTheme } from "@mui/material";
import { useGetBookings } from "../core/queries/useGetBookins";
import { IconAlertOctagon, IconCircleOff } from "@tabler/icons-react";
import { BookedTrail } from "../../gateway/src/types";

const Details = ({ cost, hotel, lunch, taxi }: Pick<BookedTrail, "taxi" | "hotel" | "lunch" | "cost">) => {
  return (
    <>
      <Typography variant="body1" mb={0.5}>
        {hotel.dateStart} {hotel.checkIn} — {hotel.dateEnd} {hotel.checkOut}
        <Typography component={"a"} href="#ffd" sx={{ ml: 1 }} variant="body1" fontWeight={"bold"}>
          {hotel.name}
        </Typography>
      </Typography>
      <Typography variant="body1" mb={0.5}>
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
    </>
  );
};

const PriceInformation = ({ cost, hotel, lunch, taxi }: Pick<BookedTrail, "taxi" | "hotel" | "lunch" | "cost">) => {
  return (
    <Box width={"auto"} sx={{ ml: 4, pl: 2, pr: 2 }}>
      <Typography variant="h6" mb={1}>
        The final cost is <Price price={cost} />
      </Typography>
      <Typography variant="body1">
        <Price price={cost} /> = (Taxi)
        <Price price={taxi.price} /> + (Hotel)
        <Price price={hotel.price} /> + (Lunch)
        <Price price={lunch.price} />
      </Typography>
    </Box>
  );
};

const Price = ({ price }: { price: number }) => (
  <Typography component="span" fontWeight="bold" variant="body1">
    {price}$
  </Typography>
);

const TrailStatus = ({ status }: Pick<BookedTrail, "status">) => {
  const text = status === "waiting" ? "Booking" : status === "canceled" ? "Canceled" : "Confirmed";
  const color = status === "waiting" ? "lightgrey" : status === "canceled" ? "red" : "green";

  return (
    <Box display={"flex"} alignItems="center">
      {status === "waiting" && <CircularProgress size={24} sx={{ mr: 3 }} />}
      <Typography mt={"auto"} component="span" variant="h5" color={color}>
        {text}
      </Typography>
    </Box>
  );
};

const WaitingStatus = () => {
  return (
    <Box width={"auto"} mt={"auto"} display="flex">
      <Typography variant="h6">The booking is in process</Typography>
    </Box>
  );
};

export const Bookings = () => {
  const { data, isError, error, isFetched } = useGetBookings();
  const bookings = data?.map(({ id, trailId, optionId, name, date, status, cost, hotel, image, lunch, taxi }) => {
    return (
      <Paper
        key={id}
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          backgroundColor: status === "canceled" ? "#dedfe0" : "initial",
        }}
      >
        <Box display="flex" justifyContent={"space-between"}>
          <Box display={"flex"}>
            <Box width="180px" height="120px">
              <img src={image} width={"100%"} height="100%" alt={name} style={{ objectFit: "cover" }} />
            </Box>
            <Box pl={2} display="flex" flexDirection="column" height="100%">
              <Typography variant="h5" mb={1}>
                {name}
                <Typography sx={{ ml: 1 }} component="span" variant="body1">
                  ({date})
                </Typography>
              </Typography>
              {status === "booked" && <Details {...{ cost, taxi, hotel, lunch }} />}
              {status === "waiting" && <WaitingStatus />}
            </Box>
            {status === "booked" && <PriceInformation {...{ cost, taxi, hotel, lunch }} />}
          </Box>
          <Box display="flex" flexDirection="column" justifyContent={"space-between"}>
            <Box ml="auto">{status !== "canceled" && <Button variant="contained">Cancel</Button>}</Box>
            <TrailStatus status={status} />
          </Box>
        </Box>
      </Paper>
    );
  });

  const theme = useTheme();
  const color = isError ? theme.palette.error.main : theme.palette.text.secondary;
  // @ts-ignore
  const errorMessage = isError ? error?.response?.data?.message || error?.message || "Something went wrong" : undefined;

  return (
    <Box width="100%">
      {data?.length || !isFetched ? (
        bookings
      ) : (
        <Box width="100%" height="150px" display="flex" alignItems="center" justifyContent="center">
          <Typography color={color} variant="h5">
            {isError ? errorMessage : "You have not booked a trail yet"}
          </Typography>
          <Box ml={2}>{isError ? <IconAlertOctagon size={35} color={color} /> : <IconCircleOff size={35} color={color} />}</Box>
        </Box>
      )}
    </Box>
  );
};
