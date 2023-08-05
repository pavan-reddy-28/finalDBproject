import axios  from 'axios'

import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    loading:false,
    professorMails:[],
    msg:"",
    error:''
}
// fulfilled, pending ,rejected
const fetchProfessorMailsNew = createAsyncThunk(
    'newProfessors/fetchProfessorMails',
    async () => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.get(
            'http://localhost:8000/fetchProfessorMails',
            config)
        return response.data["professorMails"]
    }
)



const insertProfessorNew = createAsyncThunk(
    'newProfessors/insertProfessorNew',
    async ({firstName,lastName,mail,department,enrolls,isUpdate}) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/insertProfessorNew',
            {firstName,lastName,mail,enrolls,department,isUpdate},
            config)
        return response.data["msg"]
    }
)

 const newProfessorSlice = createSlice({
    name:'newProfessors',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(fetchProfessorMailsNew.pending, (state) => {
            state.loading=true
            state.professorMails=[]
            state.error=''
        })
        builder.addCase(fetchProfessorMailsNew.fulfilled, (state,action)=>{
            state.loading=false
            state.professorMails=action.payload  
            state.error=''
        })
        builder.addCase(fetchProfessorMailsNew.rejected, (state,action)=>{
            state.loading=false
            state.professorMails=[]
            state.error=action.error.message
        })
        builder.addCase(insertProfessorNew.pending, (state) => {
            state.loading=true
            state.msg=""
            state.error=''
        })
        builder.addCase(insertProfessorNew.fulfilled, (state,action)=>{
            state.loading=false
            state.msg=action.payload  
            state.error=''
        })
        builder.addCase(insertProfessorNew.rejected, (state,action)=>{
            state.loading=false
            state.msg=""
            state.error=action.error.message
        })
        
        
    }
})

export default newProfessorSlice.reducer
export {fetchProfessorMailsNew,insertProfessorNew}