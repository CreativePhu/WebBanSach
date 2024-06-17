import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './slice/UserSlice'
import CounterReducer from './slice/CounterSlice'
import ListBookPaymentSlice from './slice/ListBookPaymentSlice'

const store = configureStore({
    reducer: {
        User: UserReducer,
        Count: CounterReducer,
        ListBookPayment: ListBookPaymentSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store