import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { findTrails } from "../trail";
import { BookingFormValue } from "../../../gateway/src/types";
import { Trail } from "../../types";

// export const useGetTrails = (payload?: BookingFormValue) => {
//   // @ts-ignore
//   return useQuery(["trails"], () => findTrails(payload), {
//     refetchOnWindowFocus: false,
//     enabled: false, // disable this query from automatically running
//     retry: false,
//   });
// };

export const useGetTrails = () => {
  // @ts-ignore
  return useQuery(["trails"], () => findTrails(undefined), {
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
    retry: false,
  });
};

export const useGetTrails2 = () => {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(findTrails, {
    mutationKey: ['trails'],
    onSuccess: (data) => {
      queryClient.setQueryData(["trails"], data);
    },
  });

  return {
    isLoading,
    getTrails: mutate,
  };
};
