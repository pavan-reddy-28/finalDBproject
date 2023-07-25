import axios  from 'axios'

import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    loading:false,
    user:{},
    error:''
}
// fulfilled, pending ,rejected
const studentLogin = createAsyncThunk(
    'student/login',
    async ({ email, password } ) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/studentLogin',
            { email, password },
            config)
        return response.data.data

    }
    
)

const studentFetch = createAsyncThunk(
    'student/fetch',
    async ({ id} ) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/getStudentDetailsById',
            { id },
            config)
        return response.data.data

    }
    
)


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



const userSlice = createSlice({
    name:'student',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(studentLogin.pending, (state) => {
            state.loading=true
            state.user={}
            state.error=''
        })
        builder.addCase(studentLogin.fulfilled, (state,action)=>{
            state.loading=false
            state.user=action.payload
            state.error=''
        })
        builder.addCase(studentLogin.rejected, (state,action)=>{
            state.loading=false
            state.user={}
            state.error=action.error.message
        })
        builder.addCase(studentFetch.pending, (state) => {
            state.loading=true
            state.user={}
            state.error=''
        })
        builder.addCase(studentFetch.fulfilled, (state,action)=>{
            state.loading=false
            state.user=action.payload
            state.error=''
        })
        builder.addCase(studentFetch.rejected, (state,action)=>{
            state.loading=false
            state.user={}
            state.error=action.error.message
        })
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

export default userSlice.reducer
export {studentLogin,studentFetch,adminLogin}


