import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

export interface TimerState {
    timerState: boolean;
};

const initialState: TimerState = {
    timerState: false,
};

export const timerSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        setTimerState: (state, action) => {
            state.timerState = action.payload;
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

export const { setTimerState } = timerSlice.actions;

export const SelectTimerState = (state: AppState) => state.timer.timerState;

export default timerSlice.reducer;
