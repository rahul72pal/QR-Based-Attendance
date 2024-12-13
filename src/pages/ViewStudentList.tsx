import { Button } from "@/components/ui/button";
// import {
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
//   Table,
// } from "@/components/ui/table";
import { getAllStudents } from "@/services/student";
import { RootState } from "@/slices/store";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { StudentDataTable } from "@/components/Student Table/data-table";
import { useColumns } from "@/components/Student Table/columns";

// Define the Student interface
// interface Student {
//   id: string;
//   name: string;
//   roll_number: number;
//   // present?: boolean; // Optional property for attendance status
//   attendance_percentage: number;
// }

const ViewStudentList = () => {
  const [students, setStudents] = useState<any>([]);
  const router = useNavigate();
  const classobj = useSelector((state: RootState) => state.class);

  // Define fetchStudents using useCallback to memoize the function
  const fetchStudents = useCallback(async () => {
    try {
      const result = await getAllStudents(classobj._id);
      if (result) {
        setStudents(result); // Set the fetched students
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }, [classobj._id]); // Dependency ensures fetchStudents is re-created only if classobj._id changes

  // Use useEffect to call fetchStudents only once
  useEffect(() => {
    if (students.length === 0) {
      fetchStudents();
    }
  }, [fetchStudents, students.length]); // Dependencies ensure fetchStudents is only called when required

  return (
    <div className="">
      <Button onClick={() => router(-1)} className="p-4 mt-6 ml-6 sm:text-xs">
        <IoArrowBackSharp />
        Back
      </Button>
      <div className="mt-8">
        <p className="text-center sm:text-lg">Student Attendance List</p>
        <p className="text-center text-xs sm:text-xs">Class 10th Science</p>
        {students && <div className="p-2"><StudentDataTable data={students} columns={useColumns()} /></div>}
      </div>
    </div>
  );
};

export default ViewStudentList;
