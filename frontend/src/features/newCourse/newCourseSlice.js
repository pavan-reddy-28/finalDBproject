import axios  from 'axios'

import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    loading:false,
    departments:[],
    classRooms:[],
    roomsByDepart:{},
    allCourses:[],
    msg:"",
    error:''
}
// fulfilled, pending ,rejected
const fetchNewDepartments = createAsyncThunk(
    'newCourses/fetchnewDepartments',
    async () => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.get(
            'http://localhost:8000/fetchDepartmentsNew',
            config)
        return response.data["departments"]
    }
)

const fetchNewClassRooms = createAsyncThunk(
    'newCourses/fetchNewClassRooms',
    async () => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.get(
            'http://localhost:8000/fetchClassroomsNew',
            config)
        return response.data["classRooms"]
    }
)

const fetchClassRoomsByDepartment = createAsyncThunk(
    'newCourses/fetchClassRoomsByDepartment',
    async ({department}) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/fetchClassRoomsByDepartment',
            {department},
            config)
        return response.data["classRoomsByDepart"]
    }
)


const insertNewDepartments = createAsyncThunk(
    'newCourses/insertNewDepartments',
    async ({department,classRooms}) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/insertDepartmentsNew',
            {department,classRooms},
            config)
        return response.data["msg"]
    }
    
)


const insertNewCourse = createAsyncThunk(
    'newCourses/insertNewCourse',
    async ({name,cid,description,department,crnArray}) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/insertCourseNew',
            {name,cid,description,department,crnArray},
            config)
        return response.data["msg"]
    }
    
)

const fetchCoursesNew = createAsyncThunk(
    'newCourses/fetchCoursesNew',
    async () => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.get(
            'http://localhost:8000/fetchCoursesNew',
            config)
        return response.data["courses"]
    }
    
)

 const newCourseSlice = createSlice({
    name:'newCourses',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(fetchNewDepartments.pending, (state) => {
            state.loading=true
            state.departments=[]
            state.error=''
        })
        builder.addCase(fetchNewDepartments.fulfilled, (state,action)=>{
            state.loading=false
            state.departments=action.payload  
            state.error=''
        })
        builder.addCase(fetchNewDepartments.rejected, (state,action)=>{
            state.loading=false
            state.departments=[]
            state.error=action.error.message
        })
        builder.addCase(insertNewDepartments.pending, (state) => {
            state.loading=true
            state.msg=""
            state.error=''
        })
        builder.addCase(insertNewDepartments.fulfilled, (state,action)=>{
            state.loading=false
            state.msg=action.payload  
            state.error=''
        })
        builder.addCase(insertNewDepartments.rejected, (state,action)=>{
            state.loading=false
            state.msg=""
            state.error=action.error.message
        })
        builder.addCase(insertNewCourse.pending, (state) => {
            state.loading=true
            state.msg=""
            state.error=''
        })
        builder.addCase(insertNewCourse.fulfilled, (state,action)=>{
            state.loading=false
            state.msg=action.payload  
            state.error=''
        })
        builder.addCase(insertNewCourse.rejected, (state,action)=>{
            state.loading=false
            state.msg=""
            state.error=action.error.message
        })
        builder.addCase(fetchNewClassRooms.pending, (state) => {
            state.loading=true
            state.classRooms=[]
            state.error=''
        })
        builder.addCase(fetchNewClassRooms.fulfilled, (state,action)=>{
            state.loading=false
            state.classRooms=action.payload  
            state.error=''
        })
        builder.addCase(fetchNewClassRooms.rejected, (state,action)=>{
            state.loading=false
            state.classRooms=[]
            state.error=action.error.message
        })
        builder.addCase(fetchCoursesNew.pending, (state) => {
            state.loading=true
            state.allCourses=[]
            state.error=''
        })
        builder.addCase(fetchCoursesNew.fulfilled, (state,action)=>{
            state.loading=false
            state.allCourses=action.payload  
            state.error=''
        })
        builder.addCase(fetchCoursesNew.rejected, (state,action)=>{
            state.loading=false
            state.allCourses=[]
            state.error=action.error.message
        })
        builder.addCase(fetchClassRoomsByDepartment.pending, (state) => {
            state.loading=true
            state.roomsByDepart={}
            state.error=''
        })
        builder.addCase(fetchClassRoomsByDepartment.fulfilled, (state,action)=>{
            state.loading=false
            state.roomsByDepart=action.payload  
            state.error=''
        })
        builder.addCase(fetchClassRoomsByDepartment.rejected, (state,action)=>{
            state.loading=false
            state.roomsByDepart={}
            state.error=action.error.message
        })
        
    }
})

export default newCourseSlice.reducer
export {fetchNewDepartments,fetchClassRoomsByDepartment,fetchCoursesNew,insertNewDepartments,insertNewCourse,fetchNewClassRooms}