import { FC, useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./style.css";
import { getStudentAttendance } from "@/services/attendance";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { CircularProgress } from "../ui/progress";
import { IoArrowBackSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "@/slices/store";

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
  const [attendance, setAttendance] = useState<attendance[]>([]);
  const [percentage, Setpercentage] = useState<number | undefined>();
  const classobj = useSelector((state: RootState)=> state.class);

  const { id: student_id } = useParams();
  const { name: student_name } = useParams();
  const router = useNavigate();

  // const values = [
  //   { date: "2024-01-01", count: 1 },
  //   // { date: "2024-01-02", count: 3 },
  //   { date: "2024-01-03", count: 2 },
  //   { date: "2024-01-04", count: 4 },
  //   { date: "2024-01-05", count: 3 },
  //   { date: "2024-01-06", count: 2 },
  //   { date: "2024-01-07", count: 1 },
  //   { date: "2024-01-08", count: 2 },
  //   { date: "2024-01-09", count: 2 },
  //   { date: "2024-01-10", count: 4 },
  //   { date: "2024-01-11", count: 1 },
  //   // { date: "2024-01-12", count: 5 },
  //   { date: "2024-01-13", count: 3 },
  //   { date: "2024-01-14", count: 3 },
  //   { date: "2024-01-15", count: 2 },
  //   { date: "2024-01-16", count: 4 },
  //   { date: "2024-01-17", count: 1 },
  //   { date: "2024-01-18", count: 3 },
  //   { date: "2024-01-19", count: 1 },
  //   { date: "2024-01-20", count: 4 },
  //   { date: "2024-01-21", count: 2 },
  //   { date: "2024-01-22", count: 2 },
  //   { date: "2024-01-23", count: 1 },
  //   { date: "2024-01-24", count: 3 },
  //   // { date: "2024-01-25", count: 2 },
  //   { date: "2024-01-26", count: 2 },
  //   // { date: "2024-01-27", count: 7 },
  //   { date: "2024-01-28", count: 3 },
  //   { date: "2024-01-29", count: 4 },
  //   // { date: "2024-01-30", count: 6 },
  //   { date: "2024-01-31", count: 3 },
  //   { date: "2024-02-01", count: 3 },
  //   { date: "2024-02-02", count: 2 },
  //   { date: "2024-02-03", count: 1 },
  //   { date: "2024-02-04", count: 1 },
  //   // { date: "2024-02-05", count: 7 },
  //   { date: "2024-02-06", count: 4 },
  //   { date: "2024-02-07", count: 2 },
  //   { date: "2024-02-08", count: 1 },
  //   { date: "2024-02-09", count: 3 },
  //   // { date: "2024-02-10", count: 6 },
  //   { date: "2024-02-11", count: 2 },
  //   { date: "2024-02-12", count: 4 },
  //   // { date: "2024-02-13", count: 8 },
  //   { date: "2024-02-14", count: 2 },
  //   { date: "2024-02-15", count: 3 },
  //   { date: "2024-02-16", count: 1 },
  //   { date: "2024-02-17", count: 2 },
  //   { date: "2024-02-18", count: 1 },
  //   { date: "2024-02-19", count: 4 },
  //   // { date: "2024-02-20", count: 1 },
  //   { date: "2024-02-21", count: 3 },
  //   { date: "2024-02-22", count: 1 },
  //   { date: "2024-02-23", count: 1 },
  //   { date: "2024-02-24", count: 2 },
  //   { date: "2024-02-25", count: 4 },
  //   { date: "2024-02-26", count: 1 },
  // ];

  console.log("current stid", student_id);

  const getAllstudentAttendance = async () => {
    try {
      const data = {
        class_id: classobj._id ? classobj._id : "",
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
  };

  useEffect(() => {
    getAllstudentAttendance();
  }, []);

  console.log(attendance,percentage);
  console.log(startDate);
  console.log(endDate);

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
      <CircularProgress value={percentage}  />
      </div>
      <div className="flex flex-col w-full pr-5 my-8 overflow-x-auto">
        <div className="calendar-container bg-[#161D29] ">
          <div className="min-w-[1100px] overflow-x-auto bg-[#161D29] pt-7 pr-6">
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
