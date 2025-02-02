import { createSlice } from "@reduxjs/toolkit";

// Function to check token validity
function getToken() {
  const token = localStorage.getItem("token");
  const expirationTimeString = localStorage.getItem("tokenExpiration");
  const expirationTime = expirationTimeString ? Number(expirationTimeString) : null; // Convert to number

  if (token && expirationTime !== null) {
      if (Date.now() < expirationTime) {
          return token; // Token is valid
      } else {
          // Token has expired
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
          localStorage.removeItem("teacher");
          return null; // Token is expired
      }
  }
  return null; // No token found
}

// Retrieve teacher information from local storage
const storedTeacherString = localStorage.getItem("teacher");
const storedTeacher = storedTeacherString
  ? JSON.parse(storedTeacherString)
  : null;

const initialState = {
  token: getToken(),
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
