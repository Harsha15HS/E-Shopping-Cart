import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice.jsx";
import ProductsSlice from "./ProductsSlice.jsx";


const store = configureStore({
    reducer: {
    user: userReducer,
    products: ProductsSlice,
    },
});
export default store;