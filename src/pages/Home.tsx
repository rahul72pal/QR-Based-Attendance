import Class from "@/components/class/Class";
// import { StudentDataTable } from "@/components/Student Table/data-table";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SliderCursol } from '../components/pages/Home/Slider/index'
import DatePicker from "@/components/general/DatePicker";
// import {students} from '../components/Student Table/StudentData'
// import {columns} from '../components/Student Table/columns'

const Home: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>()
  const router = useNavigate();

  return (
    <div className="h-[100%] p-3">
      <DatePicker date={date} setDate={setDate}/>
      <div className="overflow-x-auto"><SliderCursol/></div>
      <Class/>
      <p>Home</p>
      <button onClick={() => router('/takeattendance')}>Take Attendance</button>
      <button onClick={() => router('/student')}>Student</button>
      <Button onClick={()=>router('/viewStudentList')}>All student</Button>
      <Button onClick={()=>router('/class')}>Class</Button>
      {/* <div className="p-2"><StudentDataTable data={students} columns={columns} /></div> */}
    </div>
  );
};

export default Home;