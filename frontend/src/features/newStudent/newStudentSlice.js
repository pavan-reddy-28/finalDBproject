import axios  from 'axios'

import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    loading:false,
    studentMails:[],
    studentData:{},
    studentCourses:{},
    msg:"",
    error:''
}
// fulfilled, pending ,rejected
const fetchStudentMailsNew = createAsyncThunk(
    'newStudent/fetchStudentMailsNew',
    async () => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.get(
            'http://localhost:8000/fetchStudentMails',
            config)
        return response.data["studentMails"]
    }
)

const studentClassRegisterNew = createAsyncThunk(
    'newStudent/studentClassRegisterNew',
    async ({ studentId,setRequestData } ) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/registerStudentClassNew',
            { studentId,setRequestData },
            config)
        return response.data.success

    }
    
)

const studentDropCourseNew = createAsyncThunk(
    'newStudent/studentDropCourseNew',
    async ({ studentId,professorId } ) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/studentDropCourseNew',
            { studentId,professorId },
            config)
        return response.data.success

    }
    
)

const getStudentClassData = createAsyncThunk(
    'newStudent/getStudentClassData',
    async ({ studentId } ) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/getStudentClassData',
            { studentId },
            config)
        return response.data["studentCourses"]

    }
    
)

const insertStudentNew = createAsyncThunk(
    'newStudent/insertStudentNew',
    async ({firstName,lastName,mail,password,address,phone}) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/insertStudentNew',
            {firstName,lastName,mail,password,address,phone},
            config)
        return response.data["msg"]
    }
)

 const newStudentSlice = createSlice({
    name:'newStudent',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(fetchStudentMailsNew.pending, (state) => {
            state.loading=true
            state.studentMails=[]
            state.error=''
        })
        builder.addCase(fetchStudentMailsNew.fulfilled, (state,action)=>{
            state.loading=false
            state.studentMails=action.payload  
            state.error=''
        })
        builder.addCase(fetchStudentMailsNew.rejected, (state,action)=>{
            state.loading=false
            state.studentMails=[]
            state.error=action.error.message
        })
        builder.addCase(insertStudentNew.pending, (state) => {
            state.loading=true
            state.msg=""
            state.error=''
        })
        builder.addCase(insertStudentNew.fulfilled, (state,action)=>{
            state.loading=false
            state.msg=action.payload  
            state.error=''
        })
        builder.addCase(insertStudentNew.rejected, (state,action)=>{
            state.loading=false
            state.msg=""
            state.error=action.error.message
        })
        builder.addCase(studentClassRegisterNew.pending, (state) => {
            state.loading=true
            state.msg=""
            state.error=''
        })
        builder.addCase(studentClassRegisterNew.fulfilled, (state,action)=>{
            state.loading=false
            state.msg=action.payload  
            state.error=''
        })
        builder.addCase(studentClassRegisterNew.rejected, (state,action)=>{
            state.loading=false
            state.msg=""
            state.error=action.error.message
        })
        builder.addCase(getStudentClassData.pending, (state) => {
            state.loading=true
            state.studentCourses={}
            state.error=''
        })
        builder.addCase(getStudentClassData.fulfilled, (state,action)=>{
            state.loading=false
            state.studentCourses=action.payload  
            state.error=''
        })
        builder.addCase(getStudentClassData.rejected, (state,action)=>{
            state.loading=false
            state.studentCourses={}
            state.error=action.error.message
        })
        builder.addCase(studentDropCourseNew.pending, (state) => {
            state.loading=true
            state.msg=""
            state.error=''
        })
        builder.addCase(studentDropCourseNew.fulfilled, (state,action)=>{
            state.loading=false
            state.msg=action.payload  
            state.error=''
        })
        builder.addCase(studentDropCourseNew.rejected, (state,action)=>{
            state.loading=false
            state.msg=""
            state.error=action.error.message
        })
        
        
    }
})

export default newStudentSlice.reducer
export {fetchStudentMailsNew,studentDropCourseNew,getStudentClassData,studentClassRegisterNew,insertStudentNew}