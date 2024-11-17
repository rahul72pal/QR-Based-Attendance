import { Button } from "@/components/ui/button";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { getAllStudents } from "@/services/student";
import { RootState } from "@/slices/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

// Define the Student interface
interface Student {
  id: string;
  name: string;
  roll_number: number;
  present?: boolean; // Optional property for attendance status
}

const ViewStudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const router = useNavigate();
  const classobj = useSelector((state: RootState) => state.class);

  const fetchStudents = async () => {
    try {
      const result = await getAllStudents(classobj._id);
      // console.log("All students:", result);
      if (result) {
        setStudents(result); // Set the fetched students
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="">
      <Button onClick={() => router(-1)} className="p-5 mt-6 ml-6">
        <IoArrowBackSharp/>
        Back
      </Button>
      <div className="mt-8">
        <p className="text-center">Student Attendance List</p>
        <p className="text-center text-xs">Class 10th Science</p>
        {students && students.length > 0 ? (
          <div className="mt-8">
            <Table className="w-[75%] sm:w-[129%] pb-4 mx-auto overflow-x-auto m-6 sm:m-2 border-2 p-3">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] text-start text-[#FFD52A]">
                    Name
                  </TableHead>
                  <TableHead className="text-start w-[150px] text-[#FFD52A]">
                    Roll No
                  </TableHead>
                  <TableHead className="text-center w-[150px] text-[#FFD52A]">
                    Check Present %
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id} className="hover:bg-gray-800">
                    <TableCell className="text-start">{student.name}</TableCell>
                    <TableCell className="text-start">
                      {student.roll_number}
                    </TableCell>
                    <TableCell
                      className="text-center"
                      onClick={() =>
                        router(`/student/${student.id}/${student.name}`)
                      }
                    >
                      <Button className="bg-white text-black hover:text-white">
                        Check
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )
        :
        (<div className="text-center mt-40">
          No Student's Find
        </div>)
        }
      </div>
    </div>
  );
};

export default ViewStudentList;
