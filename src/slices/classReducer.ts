import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: null ,
    name: null 
}

const classSlice = createSlice({
    name: 'class',
    initialState: initialState,
    reducers: {
        setClassId(state, value){
            state._id = value.payload
        },
        setClassName(state, value){
            state.name = value.payload
        }
    }
});

export const {setClassId, setClassName} = classSlice.actions
export default classSlice.reducer