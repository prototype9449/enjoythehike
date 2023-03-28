import { useIsFetching, useQuery } from "@tanstack/react-query";
import { TodayWeather, TrailPlace } from "../../../gateway/src/types";
import { getTodayWeather, getWeekWeather } from "../weather";

export const useIsWeatherLoading = (): number => {
  return useIsFetching({
    predicate: (q) => ["week-weather", "today-weather"].some((x) => q.queryKey.includes(x)) && q.state.status === "loading",
  });
};

export const useGetWeekWeather = (place: TrailPlace) => {
  const { data: weekData, refetch: weekRefetch } = useQuery(
    ["week-weather", place],
    () => {
      return getWeekWeather(place);
    },
    {
      keepPreviousData: true,
      enabled: false,
    }
  );

  return {
    weekData,
    weekRefetch,
  };
};

export const useGetTodayWeather = () => {
  return useQuery<TodayWeather[], Error | string>(["today-weather"], getTodayWeather);
}
