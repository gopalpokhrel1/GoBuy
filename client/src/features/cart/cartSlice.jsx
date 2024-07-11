import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart,deleteItem,fetchUserById, resetCart, updateItem } from './cartAPI';

const initialState = {
  value: [],
  status: 'idle',
  item:[]
};

//Add to cart item are encounter from Products details  -> ProductDetails.js
export const addToCartAsync = createAsyncThunk(
  'cart/addTocart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);

//Fetch specific user Cart 
export const fetchedUserByIdAsync = createAsyncThunk(
  'cart/addTocartAsync',
  async (item) =>{ 
    const response = await fetchUserById(item);
    return response.data;
  }
);

//update item qunatity
export const updateItemAsync = createAsyncThunk(
  'cart/updateItemAsync',
  async (item) => {

    const response = await updateItem(item);
    return response.data;
  }
);
export const deleteItemAsync = createAsyncThunk(
  'cart/deleteItemAsync',
  async (id) => {

    const response = await deleteItem(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const resetCartAsync = createAsyncThunk(
  'cart/resetCartAsync',
  async (id) => {
  
    const response = await resetCart(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const addToCartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value.push(action.payload);
      })
      .addCase(fetchedUserByIdAsync.pending, (state, action) => {
        state.status = 'idle';
      
      })
      .addCase(fetchedUserByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.item= action.payload;
      })
      .addCase(updateItemAsync.pending, (state, action) => {
        state.status = 'idle';

      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.item.findIndex(items => items.id === action.payload.id);
        state.item[index]= action.payload;
      })
      .addCase(deleteItemAsync.pending, (state, action) => {
        state.status = 'idle';
      
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.item.findIndex(items => items.id === action.payload.id);
        state.item.splice(index,1);
      })
      .addCase(resetCartAsync.pending, (state, action) => {
        state.status = 'idle';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.item = []
      });
  },
});

export const { increment } = addToCartSlice.actions;


export const cartItem = (state) => state.cart.value;
export const CartById = (state) => state.cart.item;


export default addToCartSlice.reducer;
