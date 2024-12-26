import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getClassAllAttendance } from "@/services/class";
import { RootState } from "@/slices/store";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import GlobalClassSelector from "@/components/general/GlobalClassSelector";

interface student {
  id: string;
  name: string;
  roll_number: number;
}

interface attendabce {
  attendance_data: string;
  date: string;
  _id: string;
}

interface result {
    students: student[],
    attendance: attendabce[]
}

const ClassAllAttendance = () => {
  const classobj = useSelector((state: RootState) => state.class);
  const [attendanceData, setAttendanceData] = useState<result>();
  const [downloading, setdwonloading] = useState<boolean>(false);

  const getAttendance = async () => {
    try {
      const data = await getClassAllAttendance(
        classobj._id ? classobj._id : ""
      );
      if (data) {
        console.log("All attendance = ", data);
        setAttendanceData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const exportToExcel = () => {
    setdwonloading(true);
    const toastId = toast.loading("Wait..");
    if (!attendanceData) return;

    const headers = ["Date", ...attendanceData.students.map((s) => s.name)];
    const data = attendanceData.attendance.map((att) => [
      att.date ? format(new Date(att.date), "dd/MM/yyyy") : "",
      ...att.attendance_data.split("").map((char) => (char === "1" ? "P" : "A")),
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    XLSX.writeFile(workbook, `${classobj.name}.xlsx`);
    toast.dismiss(toastId);
    setdwonloading(false);
  };

  useEffect(() => {
    if(!classobj._id){
      toast('Select class!', {
        icon: '⚠️',
      });
    }else{
      getAttendance();
    }
  }, [classobj._id]);

  return (
    <div className="text-center w-[100vw] p-4 sm:p-1 flex flex-col justify-center items-center">
      {/* <Button onClick={() => router(-1)} className="p-4 mt-6 ml-6 sm:text-xs">
              <IoArrowBackSharp/>
              Back
            </Button> */}
      <GlobalClassSelector/>
      <span className="py-5">Class Over All Attendance</span>
      <Button disabled={downloading} onClick={exportToExcel} className="w-fit mx-auto my-5">Export Excel</Button>
      {
        attendanceData?.attendance &&
        attendanceData?.attendance.length > 0

        ?
        (<Table
          className="w-full text-xs py-8 pb-4 mx-auto overflow-x-auto m-6 sm:m-2 border-2 p-3"
          style={{ tableLayout: "fixed" }}
        >
          <TableHeader className="">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[100px] text-start text-[#FFD52A]">
                Date
              </TableHead>
              {attendanceData &&
                attendanceData.students.map((student: student) => (
                  <TableHead
                    key={student.id}
                    className="w-[100px] lg:text text-center text-[#FFD52A]"
                  >
                    {student.name}
                  </TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody className="h-[10px]">
            {attendanceData &&
              attendanceData.attendance.map((attendance: attendabce) => (
                <TableRow
                  className="h-[10px] hover:bg-transparent"
                  key={attendance._id}
                >
                  <TableCell className="w-[100px] text-start h-1 py-2">
                    {attendance.date ? format(attendance.date, "dd/MM/yyyy") : ""}
                  </TableCell>
                  {attendance.attendance_data
                    .split("")
                    .slice(0, attendanceData?.students.length || 0)
                    .map((char: string, index: number) => (
                      <TableCell key={index} className="text-center h-1 py-0">
                        {char === "1" ? "P" : "A"}
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>):
        (
          <div>NO Data Found</div>
        )
      }
    </div>
  );
};

export default ClassAllAttendance;
