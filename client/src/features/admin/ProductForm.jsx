import React, { useEffect } from 'react'
import { useForm} from "react-hook-form"
import { clearState, deleteProductAsync, postProductAsync, selectedProductsAsync, selectSpecificProducts, updateProductAsync } from '../product-list/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const params = useParams()
  const product = useSelector(selectSpecificProducts);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (params.id) {
      dispatch(selectedProductsAsync(params.id));
    }
    else{
      dispatch(clearState())
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (product && params.id) {
      setValue('title', product.title);
      setValue('description', product.description);
      setValue('price', product.price);
      setValue('discountPercentage', product.discountPercentage);
      setValue('stock', product.stock);
      setValue('thumbnail', product.thumbnail);
      setValue('image1', product.image1);
      setValue('image2', product.image2);
      setValue('image3', product.image3);
      setValue('image4', product.image4);
    }
  }, [product, setValue]);

  const handleDelete = ()=>{
    dispatch(deleteProductAsync(product.id));
  }




  return (
    <>
    <form onSubmit={(handleSubmit((data)=>{
       const product = {...data}
       product.images=[product.image1, product.image2,product.image3, product.image4]
       delete product.image1
       delete product.image2
       delete product.image3
       delete product.image4

       if(params.id){
        product.id = params.id
        dispatch(updateProductAsync(product))
        navigate('/admin')
       }
  else{
    dispatch(postProductAsync(product))
    navigate('/admin')

  }


      
       
    }))}>
      <div className="space-y-12 bg-white p-6">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Product title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                  {...register('title')}
                    id="title"
                
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Product title"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register('description')}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
           
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="number"
                    {...register('price')}
                    id="price"
                
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Product title"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Discount Percentage
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                    {...register('discountPercentage')}
                    id="Discount Percentage"
                
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Product title"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Stock
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="number"
                   {...register('stock')}
                    id="stock"
                
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Product title"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Thumbnail
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                   {...register('thumbnail')}
                    id="Thumbnail"
                
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Product title"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Image 1
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                {...register('image1')}
                    id="image1"
                
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Product title"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Image 2
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                    {...register('image2')}
                    id="image2"
                
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Product title"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Image 3
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                   {...register('image3')}
                    id="image3"
                
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Product title"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Image 4
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                    {...register('image4')}
                    id="image4"
                
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Product title"
                  />
                </div>
              </div>
            </div>

         
          </div>
        </div>

      

      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
       {
        product &&   <button
        onClick={handleDelete}
        className="rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Delete
      </button>
       }
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
    </>
  )
}
