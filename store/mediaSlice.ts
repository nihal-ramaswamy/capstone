import { createSlice } from "@reduxjs/toolkit";
import { AppState } from './store';
import { HYDRATE } from "next-redux-wrapper";

export interface RecordState {
    recordState: boolean;
};

const initialState: RecordState = {
    recordState: false,
};

export const mediaSlice = createSlice({
    name: "media",
    initialState,
    reducers: {
        setMediaState: (state, action) => {
            state.recordState = action.payload;
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

export const { setMediaState } = mediaSlice.actions;

export const selectMediaState = (state: AppState) => state.media.recordState;

export default mediaSlice.reducer;


