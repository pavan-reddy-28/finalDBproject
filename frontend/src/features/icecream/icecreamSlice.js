import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    noOfIcecreams:18
}

const iceCreamSlice = createSlice({
    name:'icecream',
    initialState,
    reducers:{
        ordered: (state)=>{
            state.noOfIcecreams -=1
        },
        restocked: (state,action) => {
            state.noOfIcecreams += action.payload
        }
    }
})

export default iceCreamSlice.reducer
export const icecreamActions = iceCreamSlice.actions