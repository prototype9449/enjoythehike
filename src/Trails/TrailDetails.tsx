import { Box, Button } from '@mui/material'
import { IconCircleCheck } from '@tabler/icons-react'
import { Row, ValuePart } from "./shared";

export type TrailOption = {
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

export const TrailDetails = ({ taxi, lunch, hotel, date }: TrailOption) => {
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
          <ValuePart mr={1}>{hotel.name}</ValuePart>
          <ValuePart mr={1}>{hotel.ratio}</ValuePart>
          <ValuePart>{hotel.price}$</ValuePart>
        </Row>
        <Row name="Lunch" mr={3} flex="initial">
          <ValuePart mr={1}>{lunch.dish}</ValuePart>
          <ValuePart>{lunch.price}$</ValuePart>
        </Row>
      </Box>
      <Box>
        <Button variant="contained" endIcon={<IconCircleCheck />}>
          Order
        </Button>
      </Box>
    </Box>
  );
};
