import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { mediaSlice } from "./mediaSlice";
import { timerSlice } from "./timer";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () => configureStore({
    reducer: {
        [mediaSlice.name]: mediaSlice.reducer,
        [timerSlice.name]: timerSlice.reducer,
    },
    devTools: true,
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);

