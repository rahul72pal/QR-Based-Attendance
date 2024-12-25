import { FC, useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./style.css";
import { getStudentAttendance } from "@/services/attendance";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { CircularProgress } from "../ui/progress";
import { IoArrowBackSharp } from "react-icons/io5";
import toast from "react-hot-toast";
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
  const router = useNavigate();

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
        Setpercentage((result?.attendanceCount/result?.attendance?.length)*100)
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
    <div className="w-[100vw] ">
      <div>
        <Button onClick={() => router(-1)} className="p-5 m-4">
          <IoArrowBackSharp/>
          Back
        </Button>
      </div>
      {/* You can render the startDate, endDate, and data here */}
      <h1 className="text-md flex flex-col text-center mt-5 ">
        <span>{student_name} </span>
        <span className="text-xs">(2024-09-01 to 2025-10-13)</span>
      </h1>
      <div className="rounded-full mx-auto w-fit p-6">
      <CircularProgress value={percentage && Math.floor(percentage)}  />
      </div>
      <div className="flex flex-col w-full pr-5 my-8 overflow-x-auto">
        <div className="calendar-container bg-[#161D29] w-fit mx-auto rounded-md">
          <div className="sm:min-w-[1100px] w-[900px] sm:w-[1200px] overflow-x-auto bg-[#161D29] pt-7 pr-6">
            <CalendarHeatmap
              startDate={"2024-09-01"}
              endDate={"2025-10-13"}
              values={attendance}
              classForValue={(value) => {
                if (!value) return "empty-value";
                return `color-scale-${value.count}`;
              }}
              showWeekdayLabels
              monthLabels={[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ]}
              gutterSize={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHeatMap;
