import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './Store'
import UserInf from "../data_type/Auth/UserInf";

interface CounterState {
    value: UserInf|null
}

const initialState: CounterState = {
    value: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<UserInf>) => {
            state.value = action.payload;
        },
        resetUser: (state) => {
            state.value = null;
        }
    },
})

export const { updateUser, resetUser } = userSlice.actions
export const selectCount = (state: RootState) => state.User.value
export default userSlice.reducer