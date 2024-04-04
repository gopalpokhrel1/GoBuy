import React, { useState, useEffect } from 'react'
import { validUser } from '../../auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchedLoginUserAsync } from '../userSlice';
import { updateAddressAsync } from '../userSlice';
import { useForm } from "react-hook-form"

export default function UserProfile() {

  const [display, setDisplay] = useState(false);
  const [index, setIndex] = useState(null)
  const [edit, setEdit] = useState({});
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
} = useForm();



  const loginUser = useSelector(validUser);

  const handleEdit = (e, index) => {
      const address = loginUser.address[index];
      setEdit(address);
      setDisplay(true);
      setIndex(index)

      setValue('fullname', address.fullname)
      setValue('email', address.email)
      setValue('country', address.country)
      setValue('street', address.street)
      setValue('city', address.city)
      setValue('zipcode', address.zipcode)
      setValue('province', address.province)
  }



  const handleRemove = (e, index)=>{
    const data = {address:[...loginUser.address], id:loginUser.id}
    data.address.splice(index,1);
    dispatch(updateAddressAsync(data));

  }
  useEffect(()=>{
    dispatch(fetchedLoginUserAsync(loginUser.id))
}, [handleRemove, edit])

  return (
    <div>
      <div className="mx-auto my-8 max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
        <h2 className='text-3xl'>{loginUser.address.fullname}</h2>
        <p className='text-2xl'>Role:<span className='text-2xl text-blue-500'>{loginUser.role}</span></p>
        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
            
                <li key={loginUser.id} className="flex py-6">

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className=" text-base font-medium text-gray-900">
                     
                        <p className="text-xl text-blue-500">{loginUser.email}</p>
                      </div>
                    </div>

                    <ul role="list" className="divide-y  divide-gray-100">
                      <h2>Shipping Address</h2>
                      {loginUser.address.map((add, index) => (
                        <li key={index} className="flex justify-between mt-6 gap-x-6 py-5">



                          <div className="min-w-0 flex-auto">
                            <p className="text-base font-semibold leading-6 text-gray-900">Full Name:{add.fullname}</p>
                            <p className="mt-1 truncate text-base leading-5 text-gray-500">Street: {add.street}</p>
                            <p className="mt-1 truncate text-base leading-5 text-gray-500">Province:{add.province}</p>
                          </div>

                          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="mt-1 truncate text-base leading-5 text-gray-500">City:{add.city}</p>
                            <p className="mt-1 truncate text-base leading-5 text-gray-500">Zipcode: {add.zipcode}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={(e)=> handleEdit(e, index)}
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-300"
                            >
                              Edit
                            </button>
                            <button
                            onClick={(e) => handleRemove(e, index)}
                              type="button"
                              className="font-medium text-red-600 hover:text-red-300"
                            >
                              Remove
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>

                  </div>
                </li>
              

            
            </ul>

          </div>
        </div>
      </div>
      
     {
      display ?  <div className='w-full h-[100%] absolute top-0 left-0 grid place-items-center bg-[#a1d8d169]'>
      <form
                className='bg-white px-4 rounded-2xl '

                onSubmit={handleSubmit((data)=>{
                  console.log(data);
                  const value = {address:[...loginUser.address], id:loginUser.id}
                  value.address.splice(index, 1, data)
                  dispatch(updateAddressAsync(value))
                
                setDisplay(false)
                })}

              >
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Information</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                         fullname
                        </label>
                        <div className="mt-2">
                          <input
                          {...register('fullname')}
                            type="text"
                        
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>



                      <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                          {...register('email')}
                            type="email"
                         
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                          Country
                        </label>
                        <div className="mt-2">
                          <select

                   
                            {...register('country')}
                     
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register('street')}
                       
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                          City
                        </label>
                        <div className="mt-2">
                          <input
                          {...register('city')}
                            type="text"
                          
                       
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                          {...register('province')}
                            type="text"
                           
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                          {...register('zipcode')}
                            type="text"
                  
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                     
                     type='submit'
                  
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Edit Address
                    </button>
                  </div>


                </div>


              </form>
      </div> : null
     }
    </div>
  )
}
