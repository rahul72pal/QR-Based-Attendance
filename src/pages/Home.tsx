import Class from "@/components/class/Class";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const router = useNavigate();

  return (
    <div className="h-[100%]">
      <Class/>
      <p>Home</p>
      <button onClick={() => router('/takeattendance')}>Take Attendance</button>
      <button onClick={() => router('/student')}>Student</button>
    </div>
  );
};

export default Home;