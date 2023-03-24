import { Box, Button, Link } from "@mui/material";
import { IconCircleCheck } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Row, ValuePart } from "./shared";
import { bookTrail, BookTrailPayload, findTrails, getBookings } from "../core/trail";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { BookedTrail, TrailOption } from "../types";

type Props = TrailOption & { trailName: string; trailId: string };

const useUpdate = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(
    async ({ trailId, optionId }: BookTrailPayload) => {
      return bookTrail({ trailId, optionId });
    },
    {
      onMutate: async ({ trailId, optionId }) => {

        const prevBookings = queryClient.getQueryData<BookedTrail[]>(["bookings"]) ?? [];

        queryClient.setQueryData(
          ["bookings"],
          [
            {
              trailId,
              optionId,
              name: "fffff",
              date: "123321",
              image: "/atalanti.jpeg",
            },
            ...prevBookings,
          ]
        );

        queryClient.prefetchQuery({ queryKey: ['bookings'], queryFn: getBookings })

        return { prevBookings };
      },
      //mutationKey: ["order-trail"],
      onSettled: async () => {

        //queryClient.invalidateQueries();
      },
      onSuccess: async (data) => {
        //await queryClient.invalidateQueries({ queryKey: ['bookings'], refetchType: 'all'});
        queryClient.setQueryData(["order-trail"], data);
      },
      onError: (e, bookPayload, context) => {
        console.log(e)
        queryClient.setQueryData(["bookings"], context?.prevBookings);
      },
    }
  );

  return { mutate: mutateAsync, isLoading };
};

export const TrailDetails = ({ trailName, taxi, lunch, hotel, date, trailId, optionId }: Props) => {
  // const { isFetching, isFetched, data, refetch } = useQuery(
  //   ["order-trail", trailId, optionId],
  //   () => bookTrail({ trailId, optionId }),
  //   {
  //     refetchOnWindowFocus: false,
  //     enabled: false,
  //   }
  // );
  const { mutate, isLoading } = useUpdate();
  const { enqueueSnackbar } = useSnackbar();

  // useEffect(() => {
  //   if (!isFetched || !data) {
  //     return;
  //   }
  //   if (data.status === "success") {
  //     enqueueSnackbar(`You booked a trail ${trailName}`, { variant: "success" });
  //   }
  // }, [data, enqueueSnackbar, isFetched, trailName]);

  // useEffect(() => {
  //   if (!isFetched || !data) {
  //     return;
  //   }
  //   if (data.status === "success") {
  //     enqueueSnackbar(`You booked a trail ${trailName}`, { variant: "success" });
  //   }
  // }, [data, enqueueSnackbar, isFetched, trailName]);

  const handleMutate = () => {
    return mutate({ trailId, optionId })
      .then((data) => {
        if (data.status === "success") {
          enqueueSnackbar(`You booked a trail ${trailName}`, { variant: "success" });
        } else if (data.status === "inProcess") {
          enqueueSnackbar(`We are process your request for ${trailName}`, { variant: "info" });
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
        <LoadingButton loading={isLoading} variant="contained" endIcon={<IconCircleCheck />} onClick={handleMutate}>
          Order
        </LoadingButton>
      </Box>
    </Box>
  );
};
