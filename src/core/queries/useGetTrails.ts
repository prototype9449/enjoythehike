import { useQuery } from "@tanstack/react-query";
import { findTrails } from "../trails";
import { BookingFormValue } from "../../../gateway/src/types";

export const useGetTrails = (payload?: BookingFormValue) => {
  // @ts-ignore
  return useQuery(["trails"], () => findTrails(payload), {
    enabled: false,
    keepPreviousData: true,
  });
};
