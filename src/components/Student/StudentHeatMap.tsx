import { FC, useEffect, useState } from "react";
// import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./style.css";
import { getStudentAttendance } from "@/services/attendance";
import { useParams } from "react-router-dom";
// import { Button } from "../ui/button";
import { CircularProgress } from "../ui/progress";
// import { IoArrowBackSharp } from "react-icons/io5";
// import toast from "react-hot-toast";
import Heatmap from "../general/HeatMap/Heatmap";
// import { set } from "date-fns";
import HorizontalLoader from "../general/HorizontalLoader";
import { format } from "date-fns";
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
  const [loading, setLoading] = useState<boolean>(false);

  const { id: student_id, classId } = useParams();
  const { name: student_name } = useParams();
  // const router = useNavigate();

  console.log("classId =", student_id, classId);

  const getAllstudentAttendance = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    getAllstudentAttendance();
  }, []);

  console.log(attendance,percentage);
  // console.log(startDate);
  // console.log(endDate);

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center ">
      <div className="text-lg text-center py-6 pb-[100px]">
        <p>For this QR system contact at <span className="text-sm italic text-yellow-300 ">rahulgwl72@gmail.com</span></p>
      </div>
      {/* You can render the startDate, endDate, and data here */}
      <h1 className="text-md flex flex-col text-center ">
        <span>{student_name} </span>
        {attendance && attendance.length > 0 && <span className="text-xs">{(format(attendance[0]?.date, 'PPP'))} To {(format(attendance[attendance.length-1]?.date, 'PPP'))}</span>}
      </h1>

      {attendance && attendance.length > 0 && <div className="rounded-full mx-auto w-fit p-6">
        <CircularProgress value={percentage && Math.floor(percentage)} />
      </div>}

      {loading ? (
        <HorizontalLoader />
      ) : (
        <div className="w-[100vw] ">
          {attendance && attendance.length > 0 ? <Heatmap data={attendance} /> : <div className="text-center p-6 text-2xl">No Data Found</div>}
        </div>
      )}
    </div>
  );
};

export default StudentHeatMap;
