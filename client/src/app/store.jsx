import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product-list/productSlice';
import userReducer from '../features/auth/authSlice'
import cartReducer from '../features/cart/cartSlice'
import orderReducer from '../features/order/orderSlice';
import userOrderReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    product : productReducer,
    user:userReducer,
    cart:cartReducer,
    order:orderReducer,
    fetchUserOrder:userOrderReducer,
  },
});
