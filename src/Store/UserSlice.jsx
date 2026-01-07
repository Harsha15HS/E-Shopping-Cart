import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const UserLogin = createAsyncThunk('/auth/login', async(userData, thunk)=>{
    try{
    const res = await axios.post('https://dummyjson.com/auth/login', {username: userData.username, 
        password: userData.password});
        return res.data;
    }
    catch(e){
        return thunk.rejectWithValue(e.response?.data || e.message);
    }
})

const userSlice = createSlice({
    name:'user',
    initialState:{
        data: JSON.parse(localStorage.getItem('userData')) || null,
        isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
        error: null,
        token: null,
    },
    reducers:{
        logOutUser:(state)=>{
            localStorage.setItem('isLoggedIn','false');
            localStorage.setItem('userData','null');
            state.isLoggedIn = false;
            state.data = null;
            state.token = null;
        },
                

    },
    extraReducers:(builder)=>{
        builder.addCase(UserLogin.fulfilled, (state, action)=>{
            state.data = action.payload;
            console.log(state.data);
            if(state.data){
                state.isLoggedIn = true;
                localStorage.setItem('isLoggedIn',true);
                localStorage.setItem('userData',JSON.stringify(state.data));
                
            }
            state.error = null;
            state.token = state.data.accessToken;
        }).addCase(UserLogin.rejected, (state, action)=>{
            state.data = null;
            state.error = action.payload;
            state.isLoggedIn = false;
            state.token = null;
        }).addCase(UserLogin.pending, (state)=>{
            state.data = null;
        });
    }
});
export const {logOutUser} = userSlice.actions;
export  default userSlice.reducer;