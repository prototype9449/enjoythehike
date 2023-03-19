import { places } from './constants'

export type BookingFormValue = {
  place: 'any' | TrailPlace
  range: string
  level: TrailLevel
  mostlyPath: boolean
}

export type TrailLevel = 'low' | 'medium' | 'hard'

export type TrailPlace = typeof places[number]
