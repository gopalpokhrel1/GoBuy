import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrderAsync, fetchOrderAsync, selectOrder, updateOrderAsync } from '../order/orderSlice';

import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function AdminOrder() {
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(null);
  const dispatch = useDispatch();


  const order = useSelector(selectOrder);

  const limit = 10;


    useEffect(()=>{

        const pagination = {_page:page, _limit:limit}
        dispatch(fetchOrderAsync(pagination))

      },[dispatch, page, edit]);

      const handleDelete=(id)=>{
          dispatch(deleteOrderAsync(id))
      }
      const handleEdit=(order)=>{
        setEdit(order.id)
      }
  

      const handleUpdate = (e, order)=>{
        const email =  order[0].selectedAddress.email;
        const data = {status:e.target.value, id:edit, email:email};
        
      
        dispatch(updateOrderAsync(data))
        setEdit(null)

      }
  return (
    <div className="overflow-x-auto">
    <div className=" bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
      <div className="w-full lg:w-full">
        <div className="bg-white shadow-md rounded my-6">
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">Items</th>
                <th className="py-3 px-6 text-center">Total Quantity</th>
                <th className="py-3 px-6 text-center">Total Amount</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Address</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
            {
            order &&  order.map(item  =>   <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">
                  <div className="mr-2">
                  
                  </div>
                  <span className="font-medium">{item.id}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-left">
                <div className="flex flex-col gap-2  items-center">
                {
                  item.data.map((item)=>{
                    return(
                      <div className='flex flex-row'>
                      <img
                    className="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125"
                    src={item.product.thumbnail}
                  />
                   <span>{item.title}- {item.quantity}</span>
                 
                      </div>
                    )
                  }   )
                }
                 
                </div>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex items-center justify-center">
               <span>{item.totalQuantity}</span>
                 
                </div>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex items-center justify-center">
               <span>{item.totalPrice}</span>
                 
                </div>
              </td>
              <td className="py-3 px-6 text-center">
              {edit === item.id ?  
                <select onChange={(e)=> handleUpdate(e,order)}>
                  <option value="pending">Pending</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select> :  <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
               {item.status}
                </span>}
              </td>
              <td className="py-3 px-6 text-center">
               <p className='font-semibold'>{item.selectedAddress.fullname}</p>
               <p className='font-semibold'>{item.selectedAddress.email}</p>
               <p className='font-semibold'>{item.selectedAddress.country}</p>
               <p className='font-semibold'>{item.selectedAddress.street}</p>
               <p className='font-semibold'>{item.selectedAddress.city}</p>
               <p className='font-semibold'>{item.selectedAddress.zipcode}</p>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  
                  <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                  <PencilIcon onClick={()=> handleEdit(item)}/>
                  </div>
                  <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                   <TrashIcon onClick={()=> handleDelete(item.id)}/>
                  </div>
                </div>
              </td>
            </tr>)
            }
            
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  )
}
