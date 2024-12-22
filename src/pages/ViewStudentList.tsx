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
import GlobalClassSelector from "@/components/general/GlobalClassSelector";

const ViewStudentList = () => {
  const [students, setStudents] = useState<any>([]);
  const router = useNavigate();
  const classobj = useSelector((state: RootState) => state.class);

  // Memoized fetchStudents function
  const fetchStudents = useCallback(async () => {
    try {
      const result = await getAllStudents(classobj._id);
      if (result) {
        setStudents(result); // Update students state
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }, [classobj._id]); // Dependency ensures function is recreated when classobj._id changes

  // Call fetchStudents whenever classobj._id changes
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]); // fetchStudents already depends on classobj._id

  return (
    <div className="">
      <Button onClick={() => router(-1)} className="p-4 mt-6 ml-6 sm:text-xs">
        <IoArrowBackSharp />
        Back
      </Button>
      <GlobalClassSelector />
      <div className="mt-8">
        <p className="text-center sm:text-lg">Student Attendance List</p>
        <p className="text-center text-xs sm:text-xs">Class 10th Science</p>
        {students && (
          <div className="p-2">
            <StudentDataTable data={students} columns={useColumns()} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewStudentList;
