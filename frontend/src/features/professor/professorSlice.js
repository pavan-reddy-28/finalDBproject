import axios  from 'axios'

import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    loading:false,
    professor:"",
    AllProfessorMails:[],
    professorCourse:{},
    allProfessors:{},
    submitData:"",
    error:''
}
// fulfilled, pending ,rejected
const professorRegister = createAsyncThunk(
    'professor/register',
    async ({ professorEnrollmentData, professorCollectionData,sections } ) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/registerProfessor',
            { professorEnrollmentData, professorCollectionData,sections },
            config)
        return response.data.success

    }
    
)

const professorCheckMail = createAsyncThunk(
    'professor/checkMail',
    async ({ email } ) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/checkEmail',
            { email},
            config)
        return response.data["result"]

    }
    
)


const fetchAllProfessors = createAsyncThunk(
    'professor/fetchAll',
    async () => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.get(
            'http://localhost:8000/fetchProfessors',
            config)
        return response.data

    }
    
)
const fetchAllProfessorsMails = createAsyncThunk(
    'professor/fetchAllMails',
    async () => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.get(
            'http://localhost:8000/fetchProfessorsArray',
            config)
        return response.data["professorMails"]

    }
    
)

const fetchProfessorCourseDetails = createAsyncThunk(
    'professor/fetchProfessorCourseDetails',
    async ({courseId}) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/getProfEnrollmentById',
            {courseId},
            config)
        return response.data

    }
    
)

 const professorSlice = createSlice({
    name:'professor',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(professorRegister.pending, (state) => {
            state.loading=true
            state.submitData=""
            state.error=''
        })
        builder.addCase(professorRegister.fulfilled, (state,action)=>{
            state.loading=false
            state.submitData=action.payload
            state.error=''
        })
        builder.addCase(professorRegister.rejected, (state,action)=>{
            state.loading=false
            state.submitData=""
            state.error=action.error.message
        })
        builder.addCase(fetchAllProfessors.pending, (state) => {
            state.loading=true
            state.allProfessors={}
            state.error=''
        })
        builder.addCase(fetchAllProfessors.fulfilled, (state,action)=>{
            state.loading=false
            state.allProfessors=action.payload
            state.error=''
        })
        builder.addCase(fetchAllProfessors.rejected, (state,action)=>{
            state.loading=false
            state.allProfessors={}
            state.error=action.error.message
        })
        builder.addCase(professorCheckMail.pending, (state) => {
            state.loading=true
            state.professor=""
            state.error=''
        })
        builder.addCase(professorCheckMail.fulfilled, (state,action)=>{
            state.loading=false
            state.professor=action.payload
            state.error=''
        })
        builder.addCase(professorCheckMail.rejected, (state,action)=>{
            state.loading=false
            state.professor=""
            state.error=action.error.message
        })
        builder.addCase(fetchProfessorCourseDetails.pending, (state) => {
            state.loading=true
            state.professorCourse={}
            state.error=''
        })
        builder.addCase(fetchProfessorCourseDetails.fulfilled, (state,action)=>{
            state.loading=false
            state.professorCourse=action.payload
            state.error=''
        })
        builder.addCase(fetchProfessorCourseDetails.rejected, (state,action)=>{
            state.loading=false
            state.professorCourse={}
            state.error=action.error.message
        })
        builder.addCase(fetchAllProfessorsMails.pending, (state) => {
            state.loading=true
            state.AllProfessorMails=[]
            state.error=''
        })
        builder.addCase(fetchAllProfessorsMails.fulfilled, (state,action)=>{
            state.loading=false
            state.AllProfessorMails=action.payload
            state.error=''
        })
        builder.addCase(fetchAllProfessorsMails.rejected, (state,action)=>{
            state.loading=false
            state.AllProfessorMails=[]
            state.error=action.error.message
        })
    }
})

export default professorSlice.reducer
export { professorRegister ,fetchAllProfessors,professorCheckMail,fetchProfessorCourseDetails,fetchAllProfessorsMails}


