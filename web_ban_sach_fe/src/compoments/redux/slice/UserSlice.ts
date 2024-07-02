import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import UserInf from "../../data_type/Auth/UserInf";

interface CounterState {
    value: UserInf | null
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
        updateUserFullName: (state, action: PayloadAction<string>) => {
            state.value!.fullName = action.payload;
        },
        updateUserPhoneNumber: (state, action: PayloadAction<string>) => {
            state.value!.phone = action.payload;
        },
        updateUserEmail: (state, action: PayloadAction<string>) => {
            state.value!.email = action.payload;
        },
        updateVerified: (state, action: PayloadAction<boolean>) => {
            state.value!.verified = action.payload;
        },
        resetUser: (state) => {
            state.value = null;
        }
    },
})

export const {
    updateUser,
    resetUser,
    updateUserFullName,
    updateUserPhoneNumber,
    updateVerified,
    updateUserEmail
} = userSlice.actions
export default userSlice.reducer