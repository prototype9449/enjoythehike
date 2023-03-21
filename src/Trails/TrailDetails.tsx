import { Box, Button, Link } from "@mui/material";
import { IconCircleCheck } from "@tabler/icons-react";
import { useQuery } from "react-query";
import { Row, ValuePart } from "./shared";
import { bookTrail } from "../core/trail";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect } from "react";
import { useSnackbar } from 'notistack';

export type TrailOption = {
  optionId: string;
  taxi: {
    type: string;
    price: number;
  };
  lunch: {
    price: number;
    dish: string;
  };
  hotel: {
    name: string;
    price: number;
    ratio: number;
  };
  date: string;
};

export const TrailDetails = ({ trailName, taxi, lunch, hotel, date, trailId, optionId }: TrailOption & { trailName: string, trailId: string }) => {
  const { isFetching, isFetched, data, refetch } = useQuery(["order-trail", trailId, optionId], () => bookTrail({ trailId, optionId }), {
    refetchOnWindowFocus: false,
    enabled: false,
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if(!isFetched || !data) {
      return
    }
    if(data.status === 'success'){
      enqueueSnackbar(`You booked a trail ${trailName}`, { variant: 'success' })
    }
  }, [data, enqueueSnackbar, isFetched, trailName])

  return (
    <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex">
        <Row name="When" mr={3} flex="initial">
          <ValuePart>{date}</ValuePart>
        </Row>
        <Row name="Taxi" mr={3} flex="initial">
          <ValuePart mr={1}>{taxi.type}</ValuePart>
          <ValuePart>{taxi.price}$</ValuePart>
        </Row>
        <Row name="Hotel" mr={3} flex="initial">
          <ValuePart mr={1}>
            <Link href="#" underline="none">
              {hotel.name}
            </Link>
          </ValuePart>
          <ValuePart mr={1}>{hotel.ratio}</ValuePart>
          <ValuePart>{hotel.price}$</ValuePart>
        </Row>
        <Row name="Lunch" mr={3} flex="initial">
          <ValuePart mr={1}>{lunch.dish}</ValuePart>
          <ValuePart>{lunch.price}$</ValuePart>
        </Row>
      </Box>
      <Box>
        <LoadingButton loading={isFetching} variant="contained" endIcon={<IconCircleCheck />} onClick={() => refetch()}>
          Order
        </LoadingButton>
      </Box>
    </Box>
  );
};
