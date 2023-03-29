import { bookHike, BookTrailPayload } from "../bookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFetchTrailStatus } from "./useFetchTrailStatus";
import { BookedTrail } from "../../../gateway/src/types";

type MutatePayload = {
  trailName: string;
  date: string;
  image: string;
} & BookTrailPayload;

export const useBookTrail = () => {
  const queryClient = useQueryClient();
  const { checkTrailStatus } = useFetchTrailStatus();

  const { mutateAsync, isLoading } = useMutation(
    async ({ trailId, optionId }: MutatePayload) => {
      return bookHike({ trailId, optionId });
    },
    {
      onMutate: ({ trailId, optionId, trailName, date, image }) => {
        const prevBookings = queryClient.getQueryData<BookedTrail[]>(["bookings"]) ?? [];

        queryClient.setQueryData(
          ["bookings"],
          [
            {
              id: 1231231,
              trailId,
              optionId,
              name: trailName,
              date: date,
              image: image,
              status: "waiting",
            },
            ...prevBookings,
          ]
        );

        return { prevBookings };
      },
      onSuccess: (data, { trailId, optionId }, context) => {
        //const prevBookings = queryClient.getQueryData<BookedTrail[]>(["bookings"]) ?? [];

        if (data.status === "in-process") {
          checkTrailStatus(data.id);
        } else if (data.status === "success") {
          // @ts-ignore
          queryClient.setQueryData(["bookings"], [data.data, ...context?.prevBookings]);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ["bookings"],
        });
      },
      onError: (e, bookPayload, context) => {
        console.log(e);
        queryClient.setQueryData(["bookings"], context?.prevBookings);
      },
    }
  );

  return { mutate: mutateAsync, isLoading };
};
