import axios  from 'axios'

import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    loading:false,
    courses:{},
    crns:[],
    crnArray:[],
    allDepartments:[],
    courseIdArray:[],
    addedDept:"",
    error:''
}
// fulfilled, pending ,rejected
const fetchCourses = createAsyncThunk(
    'courses/getDepartments',
    async () => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.get(
            'http://localhost:8000/getDepartments',
            config)
        return response.data

    }
    
)

const addCourses = createAsyncThunk(
    'courses/addCourses',
    async ({ title, description, department }) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/addCourses',
            { title, description, department },
            config)
        return response.data.msg
    }
)

const addDepartments = createAsyncThunk(
    'courses/addDepartments',
    async ({ department , crn}) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/addDepartments',
            { department, crn },
            config)
        return response.data.msg
    }
)

const fetchCRN = createAsyncThunk(
    'courses/fetchCrnAll',
    async () => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.get(
            'http://localhost:8000/fetchCRN',
            config)
        return response.data.crns
    }
)

const fetchCourseIdArray = createAsyncThunk(
    'courses/fetchCourseIdArray',
    async () => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.get(
            'http://localhost:8000/fetchCourseIdArray',
            config)
        return response.data["courseIdArray"]
    }
)

const fetchCrnByDepart = createAsyncThunk(
    'courses/fetchCrnByDepart',
    async ({department}) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/fetchCrnByDepart',
            {department},
            config)
        return response.data.crns
    }
)

const fetchCrnArrayById = createAsyncThunk(
    'courses/fetchCrnArrayById',
    async ({id}) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/fetchCrnById',
            {id},
            config)
        return response.data.crnArray
    }
)

const fetchAllDepartments = createAsyncThunk(
    'courses/fetchAllDepartments',
    async () => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/fetchAllDepartments',
            
            config)
        return response.data
    }
)

 const coursesSlice = createSlice({
    name:'courses',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(fetchCourses.pending, (state) => {
            state.loading=true
            state.courses={}
            state.addedDept=''
            state.error=''
        })
        builder.addCase(fetchCourses.fulfilled, (state,action)=>{
            state.loading=false
            state.courses=action.payload
            state.addedDept=''   
            state.error=''
        })
        builder.addCase(fetchCourses.rejected, (state,action)=>{
            state.loading=false
            state.courses={}
            state.addedDept=''
            state.error=action.error.message
        })
        builder.addCase(addCourses.pending, (state) => {
            state.loading=true
            state.addedDept=''
            state.error=''
        })
        builder.addCase(addCourses.fulfilled, (state,action)=>{
            state.loading=false
            state.addedDept=action.payload
            state.error=''
        })
        builder.addCase(addCourses.rejected, (state,action)=>{
            state.loading=false
            state.addedDept=''
            state.error=action.error.message
        })
        builder.addCase(addDepartments.pending, (state) => {
            state.loading=true
            state.addedDept=''
            state.error=''
        })
        builder.addCase(addDepartments.fulfilled, (state,action)=>{
            state.loading=false
            state.addedDept=action.payload
            state.error=''
        })
        builder.addCase(addDepartments.rejected, (state,action)=>{
            state.loading=false
            state.addedDept=''
            state.error=action.error.message
        })
        builder.addCase(fetchCRN.pending, (state) => {
            state.loading=true
            state.crns=[]
            state.error=''
        })
        builder.addCase(fetchCRN.fulfilled, (state,action)=>{
            state.loading=false
            state.crns=action.payload
            state.error=''
        })
        builder.addCase(fetchCRN.rejected, (state,action)=>{
            state.loading=false
            state.crns=[]
            state.error=action.error.message
        })
        builder.addCase(fetchCrnByDepart.pending, (state) => {
            state.loading=true
            state.crns=[]
            state.error=''
        })
        builder.addCase(fetchCrnByDepart.fulfilled, (state,action)=>{
            state.loading=false
            state.crns=action.payload
            state.error=''
        })
        builder.addCase(fetchCrnByDepart.rejected, (state,action)=>{
            state.loading=false
            state.crns=[]
            state.error=action.error.message
        })
        builder.addCase(fetchCrnArrayById.pending, (state) => {
            state.loading=true
            state.crnArray=[]
            state.error=''
        })
        builder.addCase(fetchCrnArrayById.fulfilled, (state,action)=>{
            state.loading=false
            state.crnArray=action.payload
            state.error=''
        })
        builder.addCase(fetchCrnArrayById.rejected, (state,action)=>{
            state.loading=false
            state.crnArray=[]
            state.error=action.error.message
        })
        builder.addCase(fetchAllDepartments.pending, (state) => {
            state.loading=true
            state.allDepartments=[]
            state.error=''
        })
        builder.addCase(fetchAllDepartments.fulfilled, (state,action)=>{
            state.loading=false
            state.allDepartments=action.payload
            state.error=''
        })
        builder.addCase(fetchAllDepartments.rejected, (state,action)=>{
            state.loading=false
            state.allDepartments=[]
            state.error=action.error.message
        })
        builder.addCase(fetchCourseIdArray.pending, (state) => {
            state.loading=true
            state.courseIdArray=[]
            state.error=''
        })
        builder.addCase(fetchCourseIdArray.fulfilled, (state,action)=>{
            state.loading=false
            state.courseIdArray=action.payload
            state.error=''
        })
        builder.addCase(fetchCourseIdArray.rejected, (state,action)=>{
            state.loading=false
            state.courseIdArray=[]
            state.error=action.error.message
        })
    }
})

export default coursesSlice.reducer
export {fetchCourses,addCourses,fetchCourseIdArray,addDepartments,fetchCRN,fetchCrnByDepart,fetchCrnArrayById,fetchAllDepartments}


