import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type AircraftType } from './types'

const initialState = {
  data: [] as AircraftType[],
}

export const aircraftSlice = createSlice({
  name: 'aircraft',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<AircraftType[]>) {
      state.data = action.payload
    },
    addAircraft: (state, action) => {
      state.data.push(action.payload)
    },
    removeAircraft: (state, action) => {
      state.data = state.data.filter(aircraft => aircraft.id !== action.payload)
    },
  },
})

export const { setData, removeAircraft, addAircraft } = aircraftSlice.actions
export const aircraftReducer = aircraftSlice.reducer
