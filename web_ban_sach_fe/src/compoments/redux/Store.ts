import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './UserSlice'
import CounterReducer from './CounterSlice'

const store = configureStore({
    reducer: {
        User: UserReducer,
        Count: CounterReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store