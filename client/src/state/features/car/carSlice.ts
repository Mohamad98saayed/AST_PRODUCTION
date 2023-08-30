import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* IMPORT SERVICES */
import {
  getAllCars,
  getOneCar,
  createCar,
  updateCar,
  deleteCar,
} from "./carService";

import { CarData } from "./carService";

// GET ALL CARS
export const getAllCarsAsync = createAsyncThunk(
  "car/getAll",
  async (_, thunkAPI) => {
    try {
      return await getAllCars();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// GET ONE CAR
export const getOneCarAsync = createAsyncThunk(
  "car/getOne",
  async (id: string, thunkAPI) => {
    try {
      return await getOneCar(id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// CREATE NEW CAR
export const createCarAsync = createAsyncThunk(
  "car/create",
  async (carData: CarData, thunkAPI) => {
    try {
      return await createCar(carData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// UPDATE CAR
export const updateCarAsync = createAsyncThunk(
  "car/update",
  async ({ id, carData }: { id: string, carData: CarData }, thunkAPI) => {
    try {
      return await updateCar(id, carData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// CREATE NEW CAR
export const deleteCarAsync = createAsyncThunk(
  "car/delete",
  async (id: string, thunkAPI) => {
    try {
      return await deleteCar(id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// INITIAL STATE
const initialState: any = {
  cars: null,
  car: null,
  response: null,
  isError: false,
  error: null,
  isLoading: false,
};

// CAR SLICE
export const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // get all cars
      .addCase(getAllCarsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCarsAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.cars = payload;
      })
      .addCase(getAllCarsAsync.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.error = payload;
      })
      // get one car
      .addCase(getOneCarAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneCarAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.car = payload;
      })
      .addCase(getOneCarAsync.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.error = payload;
      })
      // create a new car
      .addCase(createCarAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCarAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.response = payload;
      })
      .addCase(createCarAsync.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.error = payload;
      })
      // update car details
      .addCase(updateCarAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCarAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.response = payload;
      })
      .addCase(updateCarAsync.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.error = payload;
      })
      // delete car document
      .addCase(deleteCarAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCarAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.response = payload;
      })
      .addCase(deleteCarAsync.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.error = payload;
      });
  },
});

export const { reset } = carSlice.actions;
export default carSlice.reducer;
