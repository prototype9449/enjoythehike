import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { findTrails } from "../trail";
import { BookingFormValue } from "../../../gateway/src/types";
import { Trail } from "../../types";
import { useSnackbar } from "notistack";
import { AxiosError } from 'axios'

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
    enabled: false, // disable this query from automatically running
  });
};

export const useGetTrails2 = (payload?: BookingFormValue) => {
  // @ts-ignore
  return useQuery(["trails"], () => findTrails(payload), {
    enabled: false,
    keepPreviousData: true,
  });
};
