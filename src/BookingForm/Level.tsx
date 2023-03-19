import { Controller, useFormContext } from 'react-hook-form'
import { BookingFormValue } from './types'
import { Checkbox, FormControl, FormControlLabel, Slider } from '@mui/material'

const levels = [
  {
    value: 0,
    label: 'Low',
    text: 'low',
  },
  {
    value: 50,
    label: 'Medium',
    text: 'medium',
  },
  {
    value: 100,
    label: 'Hard',
    text: 'hard',
  },
] as const;

const marks = levels.map(({value, label}) => ({value, label}))

const getValueByLabel = (label: string): number => levels.find(x => x.text === label)?.value!

const getLabelByValue = (value: number | number[]) => {
  const v = Array.isArray(value) ? value[0] : value
  return levels.find(x => x.value === value)?.text!
}

export const Level = () => {
  const {
    control,
    setValue,
  } = useFormContext<BookingFormValue>()

  return (
    <Controller
      control={control}
      name="level"
      render={({ field }) => (
        <FormControl sx={{ m: 1, minWidth: 220 }}>
          <FormControlLabel
            labelPlacement="top"
            {...field}

            label="Difficulty"
            control={
              <Slider
                marks={marks}
                step={50}
                valueLabelDisplay="auto"
                min={0}
                max={100}
                value={getValueByLabel(field.value)}
                onChange={(e, value) => {
                  setValue('level', getLabelByValue(value), { shouldValidate: true, shouldTouch: true })
                }} />
            }
          />
        </FormControl>
      )}
    />
  )
}
