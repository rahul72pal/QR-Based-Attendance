import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/slices/store";
import { useNavigate } from "react-router-dom";
import { getAttdance } from "@/services/attendance";
import StudentList from "../Student/StudentList";

function cn(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface Student {
  student_id: string;
  name: string;
  class_name: string;
  roll_number: number;
  present: boolean;
}

const ClassAttendance = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const classobj = useSelector((state: RootState) => state.class);
  const [students, setStudents] = useState<Student[]>([]);
  const router = useNavigate();

  const formatDate = (date: Date | undefined): string => {
    if (!date) {
      // toast.error("Error in Date");
      return "Invalid date"; // Handle the undefined case as needed
    }

    return format(date, "yyyy-MM-dd");
  };

  const attendance = async () => {
    try {
      const data = {
        class_id: classobj._id ? classobj._id : "",
        date: formatDate(date).toString(),
      };
      if (data) {
        const attendance = await getAttdance(data);
        console.log(attendance?.attendance);
        if (attendance) {
          setStudents(attendance?.attendance);
          // setShowStudentList(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (date) {
      attendance(); 
    }
  }, [date]);

  return (
    <div>
      <Button onClick={() => router(-1)} className="p-5 mt-6 ml-6">
        Back
      </Button>
      <p className="text-center py-6">{classobj.name ? classobj.name : "No class selected"}</p>
      <div className="mx-auto flex items-center justify-center py-2">
        <Popover>
          <PopoverTrigger className="text-white bg-[#161D29]" asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal hover:text-white hover:bg-[#161D29] text-white bg-[#161D29]",
                !date && "text-muted-foreground text-white bg-[#161D29] "
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 text-white bg-[#161D29]">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="bg-[#000814] py-3">
        {students && students.length > 0 ? (
          <StudentList
            students={students}
            title={`Student Attendance ${formatDate(date).toString()}`}
          />
        )
        :
        (
            <div className="text-center py-7">No Attendance Found for this date</div>
        )
    }
      </div>
    </div>
  );
};

export default ClassAttendance;
