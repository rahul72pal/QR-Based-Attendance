import Class from "@/components/class/Class";
import { Button } from "@/components/ui/button";
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
      <Button onClick={()=>router('/viewStudentList')}>All student</Button>
      <Button onClick={()=>router('/class')}>Class</Button>
    </div>
  );
};

export default Home;