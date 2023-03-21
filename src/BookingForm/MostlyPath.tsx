import { Controller, useFormContext } from 'react-hook-form'
import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material'
import { BookingFormValue } from '../types'

export const MostlyPath = () => {
  const {
    control,
    setValue,
  } = useFormContext<BookingFormValue>()

  return (
    <Controller
      control={control}
      name="mostlyPath"
      render={({ field }) => (
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <FormControlLabel
            {...field}
            onChange={(e, checked) => {
              setValue('mostlyPath', checked, { shouldValidate: true, shouldTouch: true })
            }}
            checked={field.value}
            label="Mostly path"
            control={
              <Checkbox />
            }
          />
          <FormHelperText>Walk along a road or path</FormHelperText>
        </FormControl>
      )}
    />
  )
}
