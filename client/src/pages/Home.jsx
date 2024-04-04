import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product-list/components/ProductList";
import { useDispatch, useSelector } from 'react-redux';
import { validUser } from '../features/auth/authSlice';
import { fetchedUserByIdAsync } from '../features/cart/cartSlice';
import { fetchedLoginUserAsync } from "../features/user/userSlice";
import { useEffect } from "react";



export default function Home() {

  
  const user = useSelector(validUser);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(user){
      dispatch(fetchedUserByIdAsync(user.id));
      dispatch(fetchedLoginUserAsync(user.id));
      
    }   
  })
 

  return (
    <div>
      <Navbar>
        <ProductList/>
      </Navbar>
    </div>
  )
}
