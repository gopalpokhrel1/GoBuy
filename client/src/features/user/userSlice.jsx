import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  fetchLogginedUser, fetchUserOrder, updateAddress } from './userAPI';   

const initialState = {
  userOrder:[],
  status: 'idle',
  loginUser:null,
};

export const fetchedUserOrderAsync = createAsyncThunk(
  'counter/fetchuserorderAsync',
  async (userid) => {
    const response = await fetchUserOrder(userid);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchedLoginUserAsync = createAsyncThunk(
  'counter/fetchLoginUserAsync',
  async (userid) => {
    const response = await fetchLogginedUser(userid);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateAddressAsync = createAsyncThunk(
  'counter/updateAddressAsync',
  async (data) => {
    const response = await updateAddress(data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'userOrder',
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchedUserOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchedUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrder=action.payload;
      })
      .addCase(fetchedLoginUserAsync.pending, (state, action) => {
        state.status = 'idle';
   
      })
      .addCase(fetchedLoginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loginUser=action.payload;
      })
      .addCase(updateAddressAsync.pending, (state, action) => {
        state.status = 'idle';
 
      })
      .addCase(updateAddressAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loginUser=action.payload;
      });
  },
});

export const { increment } = userSlice.actions;


export const selectUserOrder = (state) => state.fetchUserOrder.userOrder;
export const selectLoginUser = (state) => state.fetchUserOrder.loginUser;


export default userSlice.reducer;
