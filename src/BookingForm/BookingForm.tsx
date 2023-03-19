import { Box, Paper } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { BookingFormValue } from "./types";
import { MostlyPath } from "./MostlyPath";
import { Range } from "./Range";
import { Level } from "./Level";
import { SelectPlace } from "./SelectPlace";
import { LoadingButton } from "@mui/lab";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useGetTrails } from "../core/queries/useGetTrails";


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
  const { refetch } = useGetTrails(formPayload);

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
    <FormProvider {...methods}>
      <form method="GET" onSubmit={handleSubmit(onSubmit, (...err) => console.warn(err))}>
        <Box display="flex" flexDirection="row" alignItems="center" p={2}>
          <SelectPlace />
          <Level />
          <MostlyPath />
          <Range />
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
            >
              Continue
            </LoadingButton>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
};
