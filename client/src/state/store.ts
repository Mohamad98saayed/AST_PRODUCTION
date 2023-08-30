import { configureStore } from "@reduxjs/toolkit";

/* IMPORT SLICES */
import carReducer from "./features/car/carSlice";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    cars: carReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch