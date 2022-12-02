import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

export interface UserState {
    userName: string | null;
};

const initialState: UserState = {
  userName: null,
};

export const userNameSlice = createSlice({
    name: "userName",
    initialState,
    reducers: {
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
});

export const { setUserName } = userNameSlice.actions;

export const selectUserName = (state: AppState) => state.userName.userName;

export default userNameSlice.reducer;
