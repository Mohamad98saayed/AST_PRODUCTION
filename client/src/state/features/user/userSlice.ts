import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* IMPORT SERVICES */
import { signup, signin, signout, getCurrentUser } from "./userService";
import { SignupUser, SigninUser } from "./userService";

// SIGNUP
export const signupAsync = createAsyncThunk(
    "user/signup",
    async (userData: SignupUser, thunkAPI) => {
        try {
            return await signup(userData);
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

// SIGNIN
export const signinAsync = createAsyncThunk(
    "user/signin",
    async (userData: SigninUser, thunkAPI) => {
        try {
            return await signin(userData);
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

// SIGNOUT
export const signoutAsync = createAsyncThunk(
    "user/signout",
    async (_, thunkAPI) => {
        try {
            return await signout();
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

// GET CURRENT USER ASYNC
export const getCurrentUserAsync = createAsyncThunk(
    "user/current",
    async (_, thunkAPI) => {
        try {
            return await getCurrentUser();
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
    user: null,
    isAuthenticated: false,
    response: null,
    isError: false,
    error: null,
    isLoading: false,
};

// CAR SLICE
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            // signup user
            .addCase(signupAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signupAsync.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.response = payload;
            })
            .addCase(signupAsync.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                state.error = payload;
            })
            // signin user
            .addCase(signinAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signinAsync.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.response = payload;
            })
            .addCase(signinAsync.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                state.error = payload;
            })
            // signout user
            .addCase(signoutAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signoutAsync.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.response = payload;
            })
            .addCase(signoutAsync.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.error = payload;
            })
            // get current user
            .addCase(getCurrentUserAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCurrentUserAsync.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = payload;
            })
            .addCase(getCurrentUserAsync.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                state.error = payload;
            });
    },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
