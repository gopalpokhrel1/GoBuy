import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {  useState } from 'react'
import { useForm } from "react-hook-form"
import { fetchedLoginUserAsync,  updateAddressAsync } from '../features/user/userSlice';
import { validUser } from '../features/auth/authSlice';



import {

    deleteItemAsync,
    updateItemAsync,
    CartById,
    resetCartAsync
} from '../features/cart/cartSlice';


import { Link, Navigate } from 'react-router-dom';

import { orderItemAsync, orderValue } from '../features/order/orderSlice';



export default function Checkout() {
    const [open, setOpen] = useState(true)
    const data = useSelector(CartById);
    const user = useSelector(validUser);
    const order = useSelector(orderValue);




    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const handleRemoveItem = (id) => {
        dispatch(deleteItemAsync(id))
    }
    const handleQunatity = (e, item) => {
        dispatch(updateItemAsync({id:item.id,product:item.product.id, user:item.user.id, quantity:e.target.value}));
    }

    const totalPrice = data.reduce((amount, item) => item.product.price * item.quantity + amount, 0);
    const totalQuantity = data.reduce((quantity, item) => +item.quantity + (+quantity), 0);

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [payment, setPayment] = useState('cash');

    const handleAddress = (e) => {
        setSelectedAddress(user.address[e.target.value]);
    }

    const handlePayment = (e) => {
        setPayment(e.target.value)
    }

    const handleOrder = () => {

        const order = { user:user.id, data, selectedAddress, payment, totalPrice, totalQuantity, status: 'pending' };

        if(order.selectedAddress === null || order.payment === null){
            alert("Select at least one address");
        }
        else{
           
            dispatch(orderItemAsync(order));
       
        }
       


    }

    useEffect(()=>{
        dispatch(fetchedLoginUserAsync(user.id))
    });

 
    return (
        <>

            {!data.length && <Navigate to='/' replace={true} />}
            {order && <Navigate to={`/order-success/${order.id}`} replace={true} />}
            <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                    <div className='lg:col-span-3 '>
                        <form
                            className='bg-white px-4'
                            onSubmit={handleSubmit((data) => {
                                 dispatch(updateAddressAsync({ address: [...user.address, data], id: user.id }));
                                reset();
                             
                            })}
                        >
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Fullname
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('fullname', { required: "Name is mandotory" })}
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
                                                    {...register('email', { required: "Email is mandotory" })}
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

                                                    {...register('country', { required: "Country is mandotory" })}
                                                    autoComplete="country-name"
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
                                                    {...register('street', { required: "Street is mandotory" })}
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
                                                    type="text"
                                                    {...register('city', { required: "City is mandotory" })}
                                                    autoComplete="address-level2"
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
                                                    type="text"
                                                    {...register('province', { required: "Provice is mandotory" })}
                                                    autoComplete="address-level1"
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
                                                    type="text"
                                                    {...register('zipcode', { required: "ZIP code is mandotory" })}
                                                    autoComplete="postal-code"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                 
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Add Address
                                    </button>
                                </div>

                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Choose a Address
                                    </p>
                                    <ul role="list" className="divide-y divide-gray-100">
                                        {user.address.map((add, index) => (
                                            <li key={add.pincode} className="flex justify-between gap-x-6 py-5">
                                                <div className="flex min-w-0 gap-x-4">
                                                    <input
                                                        onChange={handleAddress}
                                                        value={index}
                                                        id="address"
                                                        name="address"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />

                                                    <div className="min-w-0 flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{add.name}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{add.street}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{add.state}</p>
                                                    </div>
                                                </div>
                                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                    <p className="text-sm leading-6 text-gray-900">{add.city}</p>
                                                    <p className="text-sm leading-6 text-gray-900">{add.pincode}</p>
                                                    <p className="text-sm leading-6 text-gray-900">{add.phone}</p>

                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-10 space-y-10">

                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">Payments</legend>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">Choose one methods</p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        onChange={handlePayment}
                                                        value='cash'
                                                        id="cash"
                                                        name="payments"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Cash
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        onChange={handlePayment}
                                                        value='card'
                                                        id="card"
                                                        name="payments"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Card
                                                    </label>
                                                </div>

                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>


                        </form>
                    </div>
                    <div className='lg:col-span-2'>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
                            <h2 className='text-4xl'>Cart</h2>
                            <div className="mt-8">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {data.map((item) => (
                                            <li key={item.id} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={item.product.thumbnail}
                                                        alt='photo'
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href={item.product.href}>{item.product.title}</a>
                                                            </h3>
                                                            <p className="ml-4">{item.product.price}</p>
                                                        </div>
                                                    
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <div className="text-gray-500">
                                                            <label htmlFor="quantity" className="inline mr-3 text-sm font-medium leading-6 text-gray-900">
                                                                Qty
                                                            </label>
                                                            <select name="" id="" onChange={(e) => handleQunatity(e, item)} value={item.product.quantity}>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                            </select></div>

                                                        <div className="flex">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveItem(item.id)}
                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>


                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>{totalPrice}</p>
                                </div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Total quantity</p>
                                    <p>{totalQuantity}</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                    <button
                                        onClick={handleOrder}
                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    >
                                        Order Now
                                    </button>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or{' '}
                                        <Link to='/'>
                                            <button
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                onClick={() => setOpen(false)}
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
