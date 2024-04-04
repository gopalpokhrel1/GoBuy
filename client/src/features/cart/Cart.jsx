import { useSelector, useDispatch } from 'react-redux';
import {  useState } from 'react'


import {

  CartById,
  deleteItemAsync,
  updateItemAsync
} from './cartSlice';
import { Link, Navigate } from 'react-router-dom';




export function Cart() {

  const data = useSelector(CartById);
  
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true)

  const handleRemoveItem= (id)=>{
    dispatch(deleteItemAsync(id))
  }
  const handleQunatity = (e, item)=>{
    dispatch(updateItemAsync({id:item.id,product:item.product.id, user:item.user.id, quantity:e.target.value}))
  }

  const totalPrice = data.reduce((amount, item) => item.product.price*item.quantity + amount, 0 );
  const totalQuantity = data.reduce((quantity, item) => +item.quantity + (+quantity) , 0);

  return (
    <>
   { !data.length && <Navigate to= '/'replace={true} />}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
        <h2 className='text-4xl'>Cart</h2>
        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {data.map((item) => (
                <li key={item.product.id} className="flex py-6">
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
                      <p className="mt-1 text-sm text-gray-500">{item.product.color}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label htmlFor="quantity" className="inline mr-3 text-sm font-medium leading-6 text-gray-900">
                          Qty
                        </label>
                        <select name="" id="" onChange={(e)=> handleQunatity(e, item)} value={item.quantity}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select></div>

                      <div className="flex">
                        <button
                          type="button"
                          onClick={()=> handleRemoveItem(item.id)}
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
            <p>Total Items</p>
            <p>{totalQuantity}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6">
            <Link
              to='/checkout'
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
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
    </>
  );
}
