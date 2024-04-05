import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {PostProducts, fetchAllProducts, fetchProductsByquery, selectedProducts, updateProducts} from './productAPI';

const initialState = {
  allProducts:[],
  products: [],
  status: 'idle',
  selectedProducts:null
};
// Get all Products  -> ProductList.js
export const fetchAllProductsAsync = createAsyncThunk(  
  'product/fetchAllProducts',
  async (token) => {
    const response = await fetchAllProducts(token);
    return response.data;


  }
);
 //fetch Products by Id -> ProductDetails.js
export const selectedProductsAsync = createAsyncThunk(   
  'product/selectedProducts',
  async (id) => {
    const response = await selectedProducts(id);
    return response.data;


  }
);
export const fetchProductsByqueryAsync = createAsyncThunk(
  'product/fetchProductsByquery',
  async ({filter,sort,pagination, token}) => {
    const response = await fetchProductsByquery(filter,sort, pagination, token);
    return response.data;


  }
);
export const postProductAsync = createAsyncThunk(
  'product/postProduct',
  async (data) => {
    const response = await PostProducts(data);
    return response.data;


  }
);
export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (data) => {

    console.log(data);
    const response = await updateProducts(data);
    return response.data;


  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearState :(state, action)=>{
      state.selectedProducts= null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.allProducts= action.payload
      })
      .addCase(fetchProductsByqueryAsync.pending, (state, action) => {
        state.status = 'idle';
      })
      .addCase(fetchProductsByqueryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products= action.payload
      })
      .addCase(selectedProductsAsync.pending, (state, action) => {
        state.status = 'idle';
      })
      .addCase(selectedProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProducts= action.payload
      })
      .addCase(postProductAsync.pending, (state, action) => {
        state.status = 'idle';
    
      })
      .addCase(postProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state, action) => {
        state.status = 'idle';
       
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex((item)=> item.id == action.payload.id)
        state.products[index]= action.payload;
      });
  },
});

export const { clearState } = productSlice.actions;
export const allProducts = (state)=> state.product.allProducts
export const selectAllProducts = (state) => state.product.products;
export const selectSpecificProducts = (state) => state.product.selectedProducts;

export default productSlice.reducer;
