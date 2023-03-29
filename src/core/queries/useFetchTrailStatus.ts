import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkBookingStatus, getBookings } from "../bookings";
import { useSnackbar } from "notistack";

export const useFetchTrailStatus = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate, isLoading } = useMutation(
    async (id: number) => {
      return checkBookingStatus(id);
    },
    {
      mutationKey: ["fetchStatus"],
      onSuccess: (data, id) => {
        if (data.status === "in-process") {
          setTimeout(() => {
            mutate(id);
          }, 3000);
        } else if (data.status === "success") {
          queryClient.fetchQuery({ queryFn: getBookings, queryKey: ["bookings"] });
          enqueueSnackbar("You have successfully booked a trail", { variant: "success" });
        }
      },
      onError: (e, bookPayload, context) => {
        enqueueSnackbar("Oops, some error occurred while fetching the order status", { variant: "error" });
      },
    }
  );

  return { checkTrailStatus: mutate, isLoading };
};
