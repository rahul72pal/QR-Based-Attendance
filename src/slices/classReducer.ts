import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: null ,
    name: null ,
    classes: JSON.parse(localStorage.getItem("classes") || "[]")
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
        },
        setClasses(state, value){
            state.classes = value.payload
        }
    }
});

export const {setClassId, setClassName, setClasses} = classSlice.actions
export default classSlice.reducer