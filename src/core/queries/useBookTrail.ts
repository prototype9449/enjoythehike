import { bookTrail, BookTrailPayload } from "../trail";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookedTrail } from "../../types";
import { useFetchTrailStatus } from "./useFetchTrailStatus";

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
      return bookTrail({ trailId, optionId });
    },
    {
      onMutate: ({ trailId, optionId, trailName, date, image }) => {
        const prevBookings = queryClient.getQueryData<BookedTrail[]>(["bookings"]) ?? [];

        queryClient.setQueryData(
          ["bookings"],
          [
            {
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
      onSuccess: (data, { trailId, optionId }) => {
        if (data.status === "inProcess") {
          checkTrailStatus({ trailId, optionId });
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
