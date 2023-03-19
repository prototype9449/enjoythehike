import { Controller, useFormContext } from 'react-hook-form'
import { BookingFormValue } from './types'
import { Checkbox, FormControl, FormControlLabel } from '@mui/material'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs'

const getValue = (value: string) => {
  const s = value.split('$') as [string, string]
  return [dayjs(s[0]), dayjs(s[1])] as [Dayjs, Dayjs]
}

export const Range = () => {
  const {
    control,
    setValue,
  } = useFormContext<BookingFormValue>()

  return (
    <Controller
      control={control}
      name="range"
      render={({ field }) => (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <DemoContainer components={['DateRangePicker']}>
            <DateRangePicker {...field} value={getValue(field.value)} onChange={(v, selection) => {
              setValue('range', v.join('$'))
            }} localeText={{ start: 'Start', end: 'End' }} />
          </DemoContainer>
        </FormControl>
      )}
    />
  )
}
