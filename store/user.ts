import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

export interface UserState {
  userEmail: string | null;
  userId: string | null;
};

const initialState: UserState = {
  userEmail: null,
  userId: null
};

export const userNameSlice = createSlice({
    name: "userState",
    initialState,
    reducers: {
        setUserState: (state, action) => {
          state.userEmail = action.payload.userEmail;
          state.userId = action.payload.userId;
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

export const { setUserState } = userNameSlice.actions;

export const selectUserId = (state: AppState) => state.userState.userId;
export const selectUserEmail = (state: AppState) => state.userState.userEmail;

export default userNameSlice.reducer;
