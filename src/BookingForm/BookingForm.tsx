import { Box, Paper } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { MostlyPath } from "./MostlyPath";
import { Range } from "./Range";
import { Level } from "./Level";
import { SelectPlace } from "./SelectPlace";
import { LoadingButton } from "@mui/lab";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useGetTrails } from "../core/queries/useGetTrails";
import { Trails } from "../Trails/Trails";
import { BookingFormValue } from '../types'

export const BookingForm = () => {
  const methods = useForm<BookingFormValue>({
    mode: "all",
    defaultValues: {
      place: "any",
      mostlyPath: true,
      range: [dayjs("2022-04-17"), dayjs("2022-04-21")].join("$"),
    },
  });

  const { handleSubmit } = methods;

  const [formPayload, setFormPayload] = useState<BookingFormValue | undefined>();
  const { refetch, isFetching } = useGetTrails(formPayload);

  const onSubmit = (values: BookingFormValue) => {
    setFormPayload(values);
  };

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
            <Box display="flex" alignItems="center" >
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
      <Trails formPayload={formPayload} />
    </>
  );
};
