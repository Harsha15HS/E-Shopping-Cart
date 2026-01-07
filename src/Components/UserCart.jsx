import CartCards from './CartCards'
import store from '../Store/EcartStore'
import {  useState } from 'react';


function UserCart() {
  const [cartProducts, setCartProducts] = useState(store.getState().products.cartItem);
  const [totalPrice, setTotalPrice] = useState(store.getState().products.cartTotalPrice);

  store.subscribe(() => {
    setCartProducts(store.getState().products.cartItem);
    setTotalPrice(store.getState().products.cartTotalPrice);
  });


  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          {/* Cart Items */}
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
              {
                cartProducts.map((ele, index)=>(
                  <CartCards products={ele} key={index}/>
                ))
              }
              
                
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Order summary
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Original price</dt>
                    <dd className="font-medium text-gray-900 dark:text-white">${totalPrice}</dd>
                  </dl>

                  <dl className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Savings</dt>
                    <dd className="font-medium text-green-600">$0</dd>
                  </dl>

                  <dl className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Store Pickup</dt>
                    <dd className="font-medium text-gray-900 dark:text-white">$0</dd>
                  </dl>

                  <dl className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Tax</dt>
                    <dd className="font-medium text-gray-900 dark:text-white">$0</dd>
                  </dl>
                </div>

                <dl className="flex justify-between border-t pt-2 dark:border-gray-700">
                  <dt className="font-bold text-gray-900 dark:text-white">Total</dt>
                  <dd className="font-bold text-gray-900 dark:text-white">${totalPrice}</dd>
                </dl>
              </div>

              <button className="w-full rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700">
                Proceed to Checkout
              </button>

              <div className="flex justify-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
                <button className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline dark:text-primary-500">
                  Continue Shopping
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserCart
