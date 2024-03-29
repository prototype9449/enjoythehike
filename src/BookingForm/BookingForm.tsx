import { Box } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { MostlyPath } from "./MostlyPath";
import { Range } from "./Range";
import { Level } from "./Level";
import { SelectPlace } from "./SelectPlace";
import { LoadingButton } from "@mui/lab";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { useGetTrails } from "../core/queries/useGetTrails";
import { Trails } from "../Trails/Trails";
import { BookingFormValue, TrailPlace } from "../../gateway/src/types";

type Props = {
  chosenDay?: ChosenDay;
};

export type ChosenDay = {
  day: Dayjs;
  place: TrailPlace | "any";
};

export const BookingForm = ({ chosenDay }: Props) => {
  const methods = useForm<BookingFormValue>({
    mode: "all",
    defaultValues: {
      place: "any",
      mostlyPath: true,
      level: "low",
      range: [dayjs("2023-03-30"), dayjs("2023-04-05")].join("$"),
    },
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (!chosenDay) {
      return;
    }
    setValue("place", chosenDay.place);
    setValue("range", [chosenDay.day, chosenDay.day.add(1, "day")].join("$"));
  }, [chosenDay, setValue]);

  const [formPayload, setFormPayload] = useState<BookingFormValue | undefined>();

  const { refetch, isFetching } = useGetTrails(formPayload);

  const onSubmit = (values: BookingFormValue) => {
    //getTrails(values)
    setFormPayload(values);
  };
  //
  useEffect(() => {
    if (!formPayload) {
      return;
    }
    refetch();
  }, [formPayload, refetch]);

  return (
    <>
      <FormProvider {...methods}>
        <form method="GET" onSubmit={handleSubmit(onSubmit, (...err) => console.warn(err))}>
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" p={2}>
            <Box display="flex" alignItems="center">
              <SelectPlace />
              <Level />
              <MostlyPath />
              <Range />
            </Box>
            <Box display="flex" alignItems="center" ml={2}>
              <LoadingButton
                sx={{
                  width: "150px",
                  height: "auto",
                }}
                variant="contained"
                size="large"
                type="submit"
                loading={false}
                disabled={isFetching}
              >
                Search
              </LoadingButton>
            </Box>
          </Box>
        </form>
      </FormProvider>
      <Trails />
    </>
  );
};
