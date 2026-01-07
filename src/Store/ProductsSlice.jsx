import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const GetAllProducts = createAsyncThunk('/GetAllProducts', async (_, thunk)=>{
    try{
        const res = await axios.get('https://dummyjson.com/products');
        return await res.data;
    }
    catch(e){
        thunk.rejectWithValue(e);
    }
});

const ProductsSlice = createSlice({
    name: 'products',
    initialState: {
        productsList: [],
        cartItem:[],
        error:null,
        isLoading:'pending',
        cartTotalPrice:0,
    },
    reducers: {
        addToCart: (state, action)=>{
            const item = state.cartItem.find(ele=>ele.id === action.payload.id);
            if(item){
            state.cartItem = state.cartItem.map((ele)=>ele.id === action.payload.id? {...ele, count: ele.count+1}: ele);
            
        } else{
            state.cartItem = [...state.cartItem, {...action.payload, count:1}];
        }
        state.cartTotalPrice += action.payload.price;

        },
        increaseCount: (state, action)=>{
            state.cartItem = state.cartItem.map((ele)=>ele.id === action.payload.id? {...ele, count: ele.count+1}: ele)
            state.cartTotalPrice += action.payload.price;
        },
        decreaseCount: (state, action)=>{
            state.cartItem = state.cartItem.map((ele)=>ele.id === action.payload.id? {...ele, count: ele.count-1}: ele)
            state.cartTotalPrice -= action.payload.price;
        },
        removeFromCart: (state, action)=>{
            state.cartItem = state.cartItem.filter(ele=> ele.id !== action.payload.id)
            state.cartTotalPrice -= action.payload.price * action.payload.count;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(GetAllProducts.fulfilled, (state, action)=>{
            state.productsList = action.payload.products;
            state.isLoading = 'success';
            state.error = null;
        }).addCase(GetAllProducts.rejected, (state, action)=>{
            state.isLoading = 'rejected';
            state.error = action.error;
        }).addCase(GetAllProducts.pending, (state, action)=>{
            state.isLoading = 'pending';
            state.error = null;
        })
    }
});
export const {addToCart, increaseCount, decreaseCount, removeFromCart} = ProductsSlice.actions;
export default ProductsSlice.reducer;


