import axios  from 'axios'

import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    loading:false,
    courseDetails:{},
    studentMailArray:[],
    submitData:"",
    error:''
}
// fulfilled, pending ,rejected
const studentClassRegister = createAsyncThunk(
    'student/register',
    async ({ studentId,enrollData } ) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/registerStudentClass',
            { studentId,enrollData },
            config)
        return response.data.success

    }
    
)

const fetchStudentMailArray = createAsyncThunk(
    'student/getStudentMailArray',
    async () => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.get(
            'http://localhost:8000/getAllStudentMail',
            
            config)
        return response.data["studentMailArray"]

    }
    
)

const studentDropClass = createAsyncThunk(
    'student/dropCourse',
    async ({ courseId,studentId} ) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/dropCourse',
            { courseId,studentId},
            config)
        return response.data.message

    }
    
)

const studentSignup = createAsyncThunk(
    'student/signup',
    async ({ firstName, lastName, mail, password } ) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/studentSignup',
            { firstName, lastName, mail, password },
            config)
        return response.data.message

    }
    
)




const studentClassDetails = createAsyncThunk(
    'student/classDetails',
    async ({ studentId } ) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/getStudentClassDetails',
            { studentId},
            config)
        return response.data

    }
    
)


 const studentSlice = createSlice({
    name:'student',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(studentClassRegister.pending, (state) => {
            state.loading=true
            state.submitData=""
            state.error=''
        })
        builder.addCase(studentClassRegister.fulfilled, (state,action)=>{
            state.loading=false
            state.submitData=action.payload
            state.error=''
        })
        builder.addCase(studentClassRegister.rejected, (state,action)=>{
            state.loading=false
            state.submitData=""
            state.error=action.error.message
        })
        builder.addCase(studentClassDetails.pending, (state) => {
            state.loading=true
            state.courseDetails={}
            state.error=''
        })
        builder.addCase(studentClassDetails.fulfilled, (state,action)=>{
            state.loading=false
            state.courseDetails=action.payload
            state.error=''
        })
        builder.addCase(studentClassDetails.rejected, (state,action)=>{
            state.loading=false
            state.courseDetails={}
            state.error=action.error.message
        })
        builder.addCase(studentDropClass.pending, (state) => {
            state.loading=true
            state.submitData=""
            state.error=''
        })
        builder.addCase(studentDropClass.fulfilled, (state,action)=>{
            state.loading=false
            state.submitData=action.payload
            state.error=''
        })
        builder.addCase(studentDropClass.rejected, (state,action)=>{
            state.loading=false
            state.submitData=""
            state.error=action.error.message
        })
        builder.addCase(studentSignup.pending, (state) => {
            state.loading=true
            state.submitData=""
            state.error=''
        })
        builder.addCase(studentSignup.fulfilled, (state,action)=>{
            state.loading=false
            state.submitData=action.payload
            state.error=''
        })
        builder.addCase(studentSignup.rejected, (state,action)=>{
            state.loading=false
            state.submitData=""
            state.error=action.error.message
        })
        builder.addCase(fetchStudentMailArray.pending, (state) => {
            state.loading=true
            state.studentMailArray=[]
            state.error=''
        })
        builder.addCase(fetchStudentMailArray.fulfilled, (state,action)=>{
            state.loading=false
            state.studentMailArray=action.payload
            state.error=''
        })
        builder.addCase(fetchStudentMailArray.rejected, (state,action)=>{
            state.loading=false
            state.studentMailArray=[]
            state.error=action.error.message
        })
        
    }
})



export default studentSlice.reducer
export { studentClassRegister,studentSignup,studentClassDetails,studentDropClass,fetchStudentMailArray}


