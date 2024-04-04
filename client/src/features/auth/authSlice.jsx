import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addUserCheckout, createUser, userCheck } from './authApi';

const initialState = {
  userlogin: null,
  status: 'idle',
  validuser: JSON.parse(localStorage.getItem('user')),

  err:null
};


//create the user  
export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (value) => {
    const response = await createUser(value);
    return response.data;
  }
);

//check the user during login 
export const userCheckAsync = createAsyncThunk(
  'user/userCheck',
  async (value) => {  
    const response = await userCheck(value);
    return response.data;
  }
);
export const logOutAsync = createAsyncThunk(
  'user/logout',
  async () => {  
    const response = localStorage.removeItem('user');
    return response;
  }
);
export const addUserCheckoutAsync = createAsyncThunk(
  'user/userCheckOut',
  async (value) => {
    const response = await addUserCheckout(value);
    return response.data;
  }
);

export const createUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userlogin = action.payload;
      })
      .addCase(userCheckAsync.pending, (state, action) => {
        state.status = 'idle';
  
      })
      .addCase(userCheckAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const user = action.payload;
        localStorage.setItem('user', JSON.stringify(user));
        state.validuser = JSON.parse(localStorage.getItem('user'));
      })
      .addCase(logOutAsync.pending, (state, action) => {
        state.status = 'idle';
  
      })
      .addCase(logOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.validuser = null;
      })
      .addCase(userCheckAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.err = action.error;
      })
      .addCase(addUserCheckoutAsync.pending, (state, action) => {
        state.status = 'idle';
      })
      .addCase(addUserCheckoutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.validuser= action.payload;
      });
  },
});

export const { increment } =createUserSlice .actions;
export const userLogin = (state)=> state.user.userlogin;
export const loginUser = (state) => state.user.loginuser
export const validUser = (state) => state.user.validuser;
export const errorMessage = (state)=> state.user.err;
export default createUserSlice.reducer;
