import React from 'react'
import Navbar from "../features/navbar/Navbar";
import UserOrder from '../features/user/components/UserOrder';


export default function UserOrderPage() {
  return (
    <div>
       <Navbar>
        <h1>My order</h1>
        <UserOrder/>
      </Navbar>
    </div>
  )
}
