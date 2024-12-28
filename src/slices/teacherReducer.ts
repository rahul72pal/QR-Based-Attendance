import { createSlice } from "@reduxjs/toolkit";

// Retrieve teacher information from local storage
const storedTeacherString = localStorage.getItem("teacher");
const storedTeacher = storedTeacherString
  ? JSON.parse(storedTeacherString)
  : null;

const initialState = {
  token: localStorage.getItem("token") || null,
  name: storedTeacher ? storedTeacher.name : null,
  institute_name: storedTeacher ? storedTeacher.institution_name : null,
  institute_address: storedTeacher ? storedTeacher.institude_address : null,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState: initialState,
  reducers: {
    setToken(state, value) {
      state.token = value.payload;
    },
    setName(state, value) {
      state.name = value.payload;
    },
    setInstitueName(state, value) {
      state.institute_name = value.payload;
    },
    setInstitueAdd(state, value) {
      state.institute_address = value.payload;
    },
  },
});

export const { setName, setToken, setInstitueAdd, setInstitueName } =
  teacherSlice.actions;
export default teacherSlice.reducer;
