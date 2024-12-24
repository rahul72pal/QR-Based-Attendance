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
import ProtectedRoute from "./components/routes/ProtectedRoute";
import ParentShare from "./pages/ParentShare";
import CreateClass from "./components/class/CreateClass";
import NewAttendance from "./components/attendance/NewAttendance";
import PricingPages from "./pages/PricingPages";

const App: React.FC = () => {
  return (
    <div className="w-[100%] font-title min-h-[100vh]  bg-[#000814] text-white overflow-y-auto">
      {/* Other content */}
      <div className="">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/takeattendance"
              element={
                <ProtectedRoute>
                  <ClassIdComponent>
                    <TakeAttendance />
                  </ClassIdComponent>
                </ProtectedRoute>
              }
            />
            <Route
              path="/newattendance"
              element={
                <ProtectedRoute>
                  <ClassIdComponent>
                    <NewAttendance />
                  </ClassIdComponent>
                </ProtectedRoute>
              }
            />
            <Route
              path="/class"
              element={
                <ProtectedRoute>
                  <Class />
                </ProtectedRoute>
              }
            />
            <Route
              path="/classAttendance"
              element={
                <ProtectedRoute>
                  <ClassIdComponent>
                    <ClassAttendance />
                  </ClassIdComponent>
                </ProtectedRoute>
              }
            />
            <Route
              path="/viewStudentList"
              element={
                <ProtectedRoute>
                  <ClassIdComponent>
                    <ViewStudentList />
                  </ClassIdComponent>
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/add"
              element={
                <ProtectedRoute>
                  <ClassIdComponent>
                    <CreateStudents />
                  </ClassIdComponent>
                </ProtectedRoute>
              }
            />
            <Route
              path="/classOverall"
              element={
                <ProtectedRoute>
                  <ClassIdComponent>
                    <ClassAllAttendance />
                  </ClassIdComponent>
                </ProtectedRoute>
              }
            />
            <Route
              path="/parentshare"
              element={
                <ProtectedRoute>
                  <ClassIdComponent>
                    <ParentShare />
                  </ClassIdComponent>
                </ProtectedRoute>
              }
            />
            <Route
              path="/classCreate"
              element={
                <ProtectedRoute>
                  <CreateClass />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/pricing" element={<PricingPages/>}/>
          </Route>
          {/* <Route path="/QR" element={<QRScanner onClose={()=>void} />} /> */}
          <Route
            path="/:id/:name/:roll_number/:classId"
            element={<StudentAttendance />}
          />
          <Route
            path="/:classId/:className"
            element={<ClassParentAttendance />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
