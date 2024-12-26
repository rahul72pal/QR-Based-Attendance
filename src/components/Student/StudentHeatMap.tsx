import { FC, useEffect, useState } from "react";
// import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./style.css";
import { getStudentAttendance } from "@/services/attendance";
import {  useParams } from "react-router-dom";
// import { Button } from "../ui/button";
import { CircularProgress } from "../ui/progress";
// import { IoArrowBackSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import Heatmap from "../general/HeatMap/Heatmap";
// import { useSelector } from "react-redux";
// import { RootState } from "@/slices/store";

interface StudentHeatmapInterface {
  startDate?: string;
  endDate?: string;
  data: any;
}
// const student_id = "67360c534d7e24fe5b08fe9e";

interface attendance {
  date: string;
  count: number;
}

// Define the functional component using the interface
const StudentHeatMap: FC<StudentHeatmapInterface> = ({
  startDate,
  endDate,
  data,
}) => {
  console.log(data);
  console.log(startDate);
  console.log(endDate);
  const [attendance, setAttendance] = useState<attendance[]>([]);
  const [percentage, Setpercentage] = useState<number | undefined>();

  const { id: student_id, classId } = useParams();
  const { name: student_name } = useParams();
  // const router = useNavigate();

  console.log("classId =", student_id, classId);

  const getAllstudentAttendance = async () => {
    const toasId = toast.loading("Wait..");
    try {
      const data = {
        class_id: classId ? classId : "",
        student_id: student_id?.toString(),
      };
      const result = await getStudentAttendance(data);
      console.log(result);
      if (result) {
        Setpercentage(
          (result?.attendanceCount / result?.attendance?.length) * 100
        );
        setAttendance(result?.attendance);
      }
    } catch (error) {
      console.log(error);
    }
    toast.dismiss(toasId);
  };

  useEffect(() => {
    getAllstudentAttendance();
  }, []);

  // console.log(attendance,percentage);
  // console.log(startDate);
  // console.log(endDate);

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center ">
      <div>
        {/* <Button onClick={() => router(-1)} className="p-5 m-4">
          <IoArrowBackSharp/>
          Back
        </Button> */}
      </div>
      {/* You can render the startDate, endDate, and data here */}
      <h1 className="text-md flex flex-col text-center ">
        <span>{student_name} </span>
        <span className="text-xs">(2024-09-01 to 2025-10-13)</span>
      </h1>

      <div className="rounded-full mx-auto w-fit p-6">
        <CircularProgress value={percentage && Math.floor(percentage)} />
      </div>

      <div className="w-[100vw] ">
        <Heatmap data={attendance} />
      </div>
    </div>
  );
};

export default StudentHeatMap;
