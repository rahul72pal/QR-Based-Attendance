import Class from "@/components/class/Class";
// import { StudentDataTable } from "@/components/Student Table/data-table";
import React from "react";
// import { useNavigate } from "react-router-dom";
import { SliderCursol } from '../components/pages/Home/Slider/index'
import ServiceSection from "@/components/pages/Home/service/ServiceSection";
import Benefits from "@/components/pages/Home/Benefits/Benefits";
// import DatePicker from "@/components/general/DatePicker";
// import {students} from '../components/Student Table/StudentData'
// import {columns} from '../components/Student Table/columns'

const Home: React.FC = () => {
  // const [date, setDate] = useState<Date | undefined>()
  // const router = useNavigate();

  return (
    <div className="h-[100%] p-3">
      {/* <DatePicker date={date} setDate={setDate}/> */}
      <div className="sm:overflow-x-auto"><SliderCursol/></div>

      <div className="flex justify-center items-center pt-7"><ServiceSection/></div>

      <div><Benefits/></div>
      <Class/>
    </div>
  );
};

export default Home;