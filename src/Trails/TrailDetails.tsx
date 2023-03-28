import { Box, Button, Link } from "@mui/material";
import { IconCircleCheck } from "@tabler/icons-react";
import { Row, ValuePart } from "./shared";
import { useSnackbar } from "notistack";
import { useBookTrail } from '../core/queries/useBookTrail'
import { TrailOption } from "../../gateway/src/types";

type Props = TrailOption & { trailName: string; trailId: string, image: string };


export const TrailDetails = ({ trailName, image, taxi, lunch, hotel, date, trailId, optionId }: Props) => {
  const { mutate, isLoading } = useBookTrail();
  const { enqueueSnackbar } = useSnackbar();

  const handleMutate = () => {
    return mutate({ trailId, optionId, trailName, date, image }).then((data) => {
      if (data.status === "success") {
        enqueueSnackbar(`You booked a trail ${trailName}`, { variant: "success" });
      } else if (data.status === "inProcess") {
        enqueueSnackbar(`We are process your request for ${trailName}`, { variant: "info" });
      } else if (data.status === 'error') {
        enqueueSnackbar(data.message || "Oops, some error occurred while processing your order");
      }
    });
  };

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
        <Button disabled={isLoading} variant="contained" endIcon={<IconCircleCheck />} onClick={handleMutate}>
          Order
        </Button>
      </Box>
    </Box>
  );
};
