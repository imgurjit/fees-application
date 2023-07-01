import { configureStore } from "@reduxjs/toolkit";
import feesSlice from "./feesSlice";

export const store = configureStore({
  reducer: {
    fees: feesSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
