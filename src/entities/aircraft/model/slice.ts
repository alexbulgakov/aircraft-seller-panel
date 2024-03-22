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
  },
})

export const { setData } = aircraftSlice.actions
export const aircraftReducer = aircraftSlice.reducer
