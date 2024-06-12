import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from './Store'

export interface CounterState {
    value: number
}

const initialState: CounterState = {
    value: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        setCounter: (state, action: PayloadAction<number>) => {
            if (action.payload >= 0) {
                state.value = action.payload
            }
        }
    }
})

export const {increment, decrement, setCounter} = counterSlice.actions
export const selectCount = (state: RootState) => state.Count.value
export default counterSlice.reducer