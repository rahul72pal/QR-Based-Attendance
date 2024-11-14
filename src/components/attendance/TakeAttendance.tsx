import React, { useEffect, useState } from "react";
// import { getAllStudents } from "../../services/student";
import Modal from "../modal/modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import QRScanner from "../QRScanner";
import { getAttdance } from "@/services/attendance";
import StudentList from "../Student/StudentList";
import { getAllClass } from "@/services/class";

// Define the structure of the student data if known
interface Student {
  student_id: string;
  name: string;
  class_name: string;
  roll_number: number;
  present: boolean;
}

interface Class{
  _id: string,
  name: string
}

const TakeAttendance: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Class | null>(null);
  const class_id = "67360c3c4d7e24fe5b08fe9b";
  const [students, setStudents] = useState<Student[]>([]);
  const [showStudentList, setShowStudentList] = useState<boolean>(false);
  const [classList, setClassList] = useState<Class[]>()

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const fetchAllClasses = async () => {
    try {
      const result = await getAllClass();
      console.log("All classes = ",result?.classes);
      if (result) {
        setClassList(result?.classes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const attendance = async () => {
    try {
      const data = {
        class_id: class_id,
        date: "2024-11-9",
      };
      if (data) {
        const attendance = await getAttdance(data);
        console.log(attendance?.attendance);
        if (attendance) {
          setStudents(attendance?.attendance);
          setShowStudentList(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllClasses();
    attendance();
  }, []);

  const handleStudentSelect = (classobj: Class) => {
    setSelectedStudent(classobj);
    console.log("Selected Student: ", classobj);
  };

  console.log(students);

  return (
    <div className="bg-[#000814]">
      <div className="text-white bg-[#000814] min-h-[85vh] mt-5 text-center px-1 flex flex-col justify-between">
        {/* Choose class */}
        <div className="flex justify-between items-center py-3 gap-2">
          <div className="flex flex-col p-4 w-[50%] text-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-[#161D29] border-2 border-white w-[150px] mb-1 py-2 rounded-xl">
                {selectedStudent ? selectedStudent.name : "Select Class"}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[150px] mt-2  flex flex-col ">
                {/* <DropdownMenuLabel>Select a Student</DropdownMenuLabel> */}
                <DropdownMenuSeparator />
                {classList !== undefined &&
                  classList.length > 0 &&
                  classList.map((classobj) => (
                    <DropdownMenuItem
                      key={classobj._id}
                      className="bg-[#161D29] py-2 border border-white mb-1 rounded-lg cursor-pointer "
                      onClick={() => handleStudentSelect(classobj)}
                    >
                      {classobj.name}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-col p-4 w-[50%] text-center gap-">
            {/* DatePicker can go here */}
            <DropdownMenu>
              <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Team Management</DropdownMenuLabel>
                <DropdownMenuItem>Team Members</DropdownMenuItem>
                <DropdownMenuItem>Roles</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div>

        </div>

        <div className="bg-[#000814] py-3">
          {showStudentList && students && students.length > 0 && (
            <StudentList students={students} title={`Student Attendance ${'2024-11-09'}`} />
          )}
        </div>

        {!isModalOpen && (
          <div className="w-[75%] bg-[#000814] inset-10 mx-auto text-center">
            <button
              onClick={openModal}
              className="
              text-black bg-[#FFD52A] 
              py-2 rounded-xl font-semibold
               text-4xl w-full mx-auto"
            >
              Take
            </button>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <QRScanner attendance={attendance} onClose={closeModal} />
        </div>
      </Modal>
    </div>
  );
};

export default TakeAttendance;
