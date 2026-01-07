import HomeCards from './HomeCards'
import { useDispatch } from 'react-redux'
import { GetAllProducts } from '../Store/ProductsSlice'
import { useEffect } from 'react'
import store from '../Store/EcartStore'
import { useState } from 'react'


function Home() {


  const [product, setProducts] = useState(store.getState().products.productsList);
  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length <= 0) {
      dispatch(GetAllProducts());
    }
  }, [product]);

  store.subscribe(() => {
    setProducts(store.getState().products.productsList);
  });





  return (
    <>
      <header className='bg-blue-300 h-100 flex justify-center items-center lg:text-3xl font-bold'>
        <h1> Welcome to E-Cart </h1>
      </header>
      <div className='flex flex-wrap justify-center items-center' >

        {
          product.map((ele, index) => (
            <HomeCards product={ele} />
          ))
        }
      </div>
    </>
  )
}

export default Home

