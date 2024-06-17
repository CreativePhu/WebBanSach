import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ListBookPaymentSlice {
    value: number[]
}

const initialState: ListBookPaymentSlice = {
    value: [],
}

export const listBookPaymentSlice = createSlice({
    name: 'listBookPayment',
    initialState,
    reducers: {
        setListBookPayment: (state, action: PayloadAction<number[]>) => {
            state.value = action.payload
        },
        ressetListBookPayment: (state) => {
            state.value = []
        }
    },
})

export const { setListBookPayment, ressetListBookPayment } = listBookPaymentSlice.actions
export default listBookPaymentSlice.reducer