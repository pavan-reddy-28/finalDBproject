import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
// import studentReducer from '../features/student/studentSlice'
// import adminReducer from "../features/admin/adminSlice"
import userReducer from '../features/users/userSlice'
// import { getDefaultMiddleware } from '@reduxjs/toolkit'

const logger = createLogger()
const store = configureStore(
    {
        reducer:{
            user:userReducer,
            
        },
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
      }
)

export default store