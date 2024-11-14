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
  import { useEffect, useState } from "react";
  
  // Define the Student interface
  interface Student {
    id: string;
    name: string;
    roll_number: number;
    present?: boolean; // Optional property for attendance status
  }
  
  const class_id = "67360c3c4d7e24fe5b08fe9b";
  
  const ViewStudentList = () => {
    const [students, setStudents] = useState<Student[]>([]); // Initialize state with an empty array
  
    const fetchStudents = async () => {
      try {
        const result = await getAllStudents(class_id);
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
      <div>
        <div>
          <p>Student Attendance List</p>
          <div>
            <Table className="w-[75%] sm:w-[99%] pb-4 mx-auto overflow-x-auto m-6 sm:m-2 border-2 p-3">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px] text-start text-[#FFD52A]">
                    Name
                  </TableHead>
                  <TableHead className="text-start text-[#FFD52A]">
                    Roll No
                  </TableHead>
                  <TableHead className="text-center text-[#FFD52A]">
                    Check Present %
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id} className="hover:bg-gray-800">
                    <TableCell className="text-start">{student.name}</TableCell>
                    <TableCell className="text-start">{student.roll_number}</TableCell>
                    <TableCell className="text-center">
                      <Button className="bg-white text-black hover:text-white">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  };
  
  export default ViewStudentList;