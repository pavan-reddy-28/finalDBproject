import axios  from 'axios'

import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    loading:false,
    user:{},
    error:''
}
// fulfilled, pending ,rejected
const adminLogin = createAsyncThunk(
    'admin/login',
    async ({ email, password } ) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/adminLogin',
            { email, password },
            config)
        return response.data.data

    }
    
)


 const adminSlice = createSlice({
    name:'admin',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(adminLogin.pending, (state) => {
            state.loading=true
            state.user={}
            state.error=''
        })
        builder.addCase(adminLogin.fulfilled, (state,action)=>{
            state.loading=false
            state.user=action.payload
            state.error=''
        })
        builder.addCase(adminLogin.rejected, (state,action)=>{
            state.loading=false
            state.user={}
            state.error=action.error.message
        })
    }
})

export default adminSlice.reducer
export {adminLogin}


