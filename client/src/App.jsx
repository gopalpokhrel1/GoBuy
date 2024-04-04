import React, { useEffect } from 'react';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";


import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Protected from './features/auth/components/Protected';
import NotFoundPage from './pages/NotFoundPage';
import OrderSuccess from './pages/OrderSuccess';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfile';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AdminProductDetailsPage from './pages/AdminProductDetailsPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrderPage from './pages/AdminOrderPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: (
    <Protected>
        <Home/>
    </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
    <ProtectedAdmin>
        <AdminHome/>
    </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/signup",
    element: <SignupPage/>,
  },
  {
    path: "/cart",
    element:<Protected> <CartPage/></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><Checkout/></Protected>,
  },
  {
    path: "/productdetails/:id",
    element: <Protected><ProductDetailsPage/></Protected>
  },
  {
    path: "/admin/productdetails/:id",
    element: <ProtectedAdmin><AdminProductDetailsPage/></ProtectedAdmin>
  },
  {
    path: "/admin/productform",
    element: <ProtectedAdmin><AdminProductFormPage/></ProtectedAdmin>
  },
  {
    path: "/admin/order",
    element: <ProtectedAdmin><AdminOrderPage/></ProtectedAdmin>
  },
  {
    path: "/admin/edit/:id",
    element: <ProtectedAdmin><AdminProductFormPage/></ProtectedAdmin>
  },
  {
    path:'/order-success/:id',
    element: <OrderSuccess/> 
  },
  {
    path:'/order',
    element: <Protected><UserOrderPage/></Protected>
  },
  {
    path:'/profile',
    element: <Protected><UserProfilePage/></Protected>
  },
  {
    path:'*',
    element:<NotFoundPage/>
  }
]);


function App() {



  return (
    <>
<RouterProvider router={router} />


    </>
  );
}

export default App;
