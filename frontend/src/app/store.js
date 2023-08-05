import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
// import studentReducer from '../features/student/studentSlice'
// import adminReducer from "../features/admin/adminSlice"
import userReducer from '../features/users/userSlice'
// import { getDefaultMiddleware } from '@reduxjs/toolkit'
import courseReducer from '../features/courses/courseSlice'
import professorReducer from '../features/professor/professorSlice'
import studentReducer from '../features/student/studentSlice'
import newCourseSlice from '../features/newCourse/newCourseSlice'
import newProfessorSlice from '../features/newProfessor/newProfessorSlice'
import newStudentSlice from '../features/newStudent/newStudentSlice'
const logger = createLogger()
const store = configureStore(
    {
        reducer:{
            user:userReducer,
            courses:courseReducer,
            professor:professorReducer,
            student:studentReducer,
            newCourses:newCourseSlice,
            newProfessor:newProfessorSlice,
            newStudent:newStudentSlice
        },
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
      }
)

export default store