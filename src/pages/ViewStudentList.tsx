// import { Button } from "@/components/ui/button";
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
// import { useNavigate } from "react-router-dom";
// import { IoArrowBackSharp } from "react-icons/io5";
import { StudentDataTable } from "@/components/Student Table/data-table";
import { useColumns } from "@/components/Student Table/columns";
import GlobalClassSelector from "@/components/general/GlobalClassSelector";
import toast from "react-hot-toast";
import Modal from "@/components/modal/modal";
import EditStudent from "@/components/Student/EditStudent";

interface StudentType {
  id: string;
  name: string;
  roll_number: number;
  attendance_percentage: number;
  father_name: string;
  dob: string;
}

const ViewStudentList = () => {
  const [selectedStudent, setSelectedStudent] = useState<StudentType | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = useColumns(setSelectedStudent, setIsModalOpen);
  const [students, setStudents] = useState<any>([]);
  // const teacher = useSelector((state: RootState) => state.teacher);
  // const router = useNavigate();
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
    if (classobj._id) {
      fetchStudents();
    } else {
      toast("Select class!", {
        icon: "⚠️",
      });
    }
  }, [fetchStudents]); // fetchStudents already depends on classobj._id

  console.log("11111122222222=", selectedStudent);

  return (
    <div className="w-[100vw]">
      {/* <Button onClick={() => router(-1)} className="p-4 mt-6 ml-6 sm:text-xs">
        <IoArrowBackSharp />
        Back
      </Button> */}
      <GlobalClassSelector />
      <div className="mt-8">
        <p className="text-center sm:text-lg">Student Attendance List</p>
        <p className="text-center text-xs sm:text-xs">Class 10th Science</p>
        {classobj._id && students && (
          <div className="p-2 w-[100vw] overflow-x-auto">
            <StudentDataTable data={students} columns={columns} />
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <EditStudent
          id={selectedStudent?.id ? selectedStudent.id: ""}
          name={selectedStudent?.name ? selectedStudent.name : ""}
          father_name={selectedStudent?.father_name? selectedStudent.father_name: ""}
          dob={selectedStudent?.dob? selectedStudent.dob : ""}
          onClose={() => setIsModalOpen(false)}
          fetchStudentList={()=>fetchStudents()}
        />
      </Modal>
    </div>
  );
};

export default ViewStudentList;
