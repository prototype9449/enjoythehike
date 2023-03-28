import { Controller, useFormContext } from 'react-hook-form'
import { useMemo } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { places } from "../constants";
import { BookingFormValue } from "../../gateway/src/types";

export const SelectPlace = () => {
  const {
    control,
  } = useFormContext<BookingFormValue>()

  const menuItems = useMemo(() => {
    return places.map(x => <MenuItem key={x} value={x}>{x}</MenuItem>)
  }, [])

  return <Controller
    control={control}
    name="place"
    render={({ field }) => (<FormControl sx={{ m: 1, minWidth: 160 }}>
      <InputLabel id="demo-simple-select-helper-label">Place</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        label="Place"
        {...field}
      >
        <MenuItem value="any">
          <em>None</em>
        </MenuItem>
        {menuItems}
      </Select>
    </FormControl>)}
  />
}
