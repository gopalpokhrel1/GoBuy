import React, { useEffect , useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchedUserOrderAsync, selectUserOrder } from '../userSlice'
import { validUser, userLogin} from '../../auth/authSlice';
import { Link } from 'react-router-dom';


export default function UserOrder() {

    const [open, setOpen] = useState(true)
    const dispatch = useDispatch();
    const user = useSelector(validUser);

    
    useEffect(()=>{
        dispatch(fetchedUserOrderAsync(user.id));
    },[]);

    const order = useSelector(selectUserOrder);
  return (
    <>
    {
        order.map((product)=>{
            return(
                    
              <div className="mx-auto my-8 max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
              <h2 className='text-4xl'>Orders</h2>
              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {product.data.map((item) => (
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
                                <p>{item.title}</p>
                              </h3>
                              <p className="ml-4">{item.price}</p>
                            </div>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label htmlFor="quantity" className="inline mr-3 text-sm font-medium leading-6 text-gray-900">
                                Qty : {item.quantity}
                              </label>
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
                  <p>{product.totalPrice}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Items</p>
                  <p>{product.totalQuantity}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Your orders are successfully placed</p>
              
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
                
            )
        })
    }
     
    </>
  )
}
