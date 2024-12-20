import React from "react";
import { Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
// import QRScanner from "./components/QRScanner";
import TakeAttendance from "./components/attendance/TakeAttendance";
import StudentAttendance from "./pages/StudentAttendance";
import ViewStudentList from "./pages/ViewStudentList";
import Class from "./pages/Class";
import ClassAttendance from "./components/class/ClassAttendance";
import ClassIdComponent from "./utils/ClassIdComponent";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateStudents from "./components/Student/CreateStudents";
import ClassAllAttendance from "./pages/ClassAllAttendance";
import ClassParentAttendance from "./pages/ClassParentAttendance";
import Layout from "./components/Layout";

const App: React.FC = () => {
  return (
    <div className="w-[100%] font-title h-[100%] bg-[#000814] text-white">
      {/* <QRScanner/> */}
      <div className="sm:min-h-[90vh] pb-4 ">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/takeattendance"
              element={
                <ClassIdComponent>
                  <TakeAttendance />
                </ClassIdComponent>
              }
            />
            <Route path="/class" element={<Class />} />
            <Route
              path="/classAttendance"
              element={
                <ClassIdComponent>
                  <ClassAttendance />
                </ClassIdComponent>
              }
            />
            <Route
              path="/viewStudentList"
              element={
                <ClassIdComponent>
                  <ViewStudentList />
                </ClassIdComponent>
              }
            />
            <Route
              path="/student/add"
              element={
                <ClassIdComponent>
                  <CreateStudents />
                </ClassIdComponent>
              }
            />
            <Route
              path="/classOverall"
              element={
                <ClassIdComponent>
                  <ClassAllAttendance />
                </ClassIdComponent>
              }
            />
          </Route>
          {/* <Route path="/QR" element={<QRScanner onClose={()=>void} />} /> */}
          <Route
            path="/student/:id/:name/:classId"
            element={<StudentAttendance />}
          />
          <Route
            path="/:classId/:className"
            element={<ClassParentAttendance />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
