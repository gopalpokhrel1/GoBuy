import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteOrder, fetchAllOrders, orderItem, orderItemUsingEpay, updateOrder } from './orderAPI';

const initialState = {
  value: [],
  status: 'idle',
  orderContent:null,
  ePayContent:null,
};

export const orderItemAsync = createAsyncThunk(
  'order/orderItem',
  async (order) => {
    const response = await orderItem(order);

    return response.data;
  }
);
export const orderItemUsingEpayAsync = createAsyncThunk(
  'order/orderItemUsingEpay',
  async (order) => {
    const response = await orderItemUsingEpay(order);

    return response.data;
  }
);
export const fetchOrderAsync = createAsyncThunk(
  'order/fetchOrder',
  async (pagination) => {
    const response = await fetchAllOrders(pagination);

    return response.data;
  }
);
export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (order) => {
    const response = await updateOrder(order);

    return response.data;
  }
);
export const deleteOrderAsync = createAsyncThunk(
  'order/deleteOrder',
  async (id) => {
    
    const response = await deleteOrder(id);

    return response.data;
  }
);


export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
  resetOrder : (state)=>{
    state.orderContent= null;
  }
  },

  extraReducers: (builder) => {
    builder
      .addCase(orderItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(orderItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value.push(action.payload);
        state.orderContent = action.payload;
      
      })
      .addCase(orderItemUsingEpayAsync.pending, (state, action) => {
        state.status = 'loading';
      
      })
      .addCase(orderItemUsingEpayAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.ePayContent = action.payload;
      
      })
      .addCase(fetchOrderAsync.pending, (state, action) => {
        state.status = 'idle';

      })
      .addCase(fetchOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value=action.payload;
      })
      .addCase(updateOrderAsync.pending, (state, action) => {
        state.status = 'idle';
      
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      const index = state.value.findIndex(item=> item.id == action.payload.id)
      state.value[index]= action.payload
      })
      .addCase(deleteOrderAsync.pending, (state, action) => {
        state.status = 'idle';
     
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      const index = state.value.findIndex(item=> item.id == action.payload.id)
      state.value.splice(index, 1)
      });
  },
});

export const { resetOrder } = orderSlice.actions;


export const selectOrder = (state) => state.order.value;
export const orderValue =(state) =>  state.order.orderContent;
export const ePayValue = (state)=> state.order.ePayContent;




export default orderSlice.reducer;
