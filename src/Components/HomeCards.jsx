import React from 'react'
import ReactLogo from '../assets/react.svg'
import { useDispatch } from 'react-redux'
import store from '../Store/EcartStore'
import { addToCart } from '../Store/ProductsSlice'

function HomeCards({product}) {
    const dispatch = useDispatch();
    const handleaddToCart = ()=>{
        dispatch(addToCart(product));
    }
    store.subscribe(()=>{
        console.log(store.getState().products.cartItem);
    })
  return (
    <>
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-10">
            <img className="w-full" src={product.thumbnail} alt="Sunset in the mountains" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.title}</div>
                <p className="text-gray-700 text-base">
                    {product.description}
                </p>
            </div>
            <div className='bg-blue-600 text-center h-10 text-lg font-bold flex justify-center hover:bg-blue-500' >
                <button className='cursor-pointer'onClick={handleaddToCart}>Add To Cart</button>
            </div>
            
        </div>

    </>
  )
}

export default HomeCards