import { Button } from "@/components/ui/button";
import { getAllClass } from "@/services/class";
import { setClassId, setClassName } from "@/slices/classReducer";
import { RootState } from "@/slices/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { LuScrollText } from "react-icons/lu";
import { FaGraduationCap } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { IoArrowBackSharp } from "react-icons/io5";
interface Class {
  _id: string | null;
  name: string | null;
}

const Class = () => {
  const [classList, setClassList] = useState<Class[]>();
  const classObj = useSelector((state: RootState) => state.class)
  const [selectedClass, setSelectedClass] = useState<Class | null>(classObj);
  const dispatch = useDispatch();
  const router = useNavigate();

  const fetchAllClasses = async () => {
    try {
      const result = await getAllClass();
      console.log("All classes = ", result?.classes);
      if (result) {
        setClassList(result?.classes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllClasses();
  }, []);

  const handleClassSelect = (classobj: Class) => {
    setSelectedClass(classobj);
    dispatch(setClassId(classobj._id));
    dispatch(setClassName(classobj.name));
  };

  console.log("Selected Student: ", selectedClass);

  return (
    <div>
      <Button className="p-5 mt-6 ml-6" onClick={() => router(-1)}>
        <IoArrowBackSharp/>
        Back
      </Button>
      <div className="flex justify-between items-center py-3 gap-2">
        <div className="flex flex-col p-4 w-[50%] text-center gap-1 mx-auto">
          <p className="text-xs text-center">Choose Class</p>
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-[#161D29] border text-sm border-white w-[150px] mb-1 py-2 rounded-xl">
              {selectedClass?.name ? selectedClass.name : "Select Class"}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[150px] mt-2  flex flex-col ">
              {/* <DropdownMenuLabel>Select a Student</DropdownMenuLabel> */}
              <DropdownMenuSeparator />
              {classList !== undefined &&
                classList.length > 0 &&
                classList.map((classobj) => (
                  <DropdownMenuItem
                    key={classobj?._id}
                    className={`${
                      classobj._id === selectedClass?._id
                        ? "bg-[#FFD52A] text-black"
                        : "bg-[#161D29] "
                    } 
                      py-2 border text-xs
                      border-white mb-1 rounded-lg cursor-pointer `}
                    onClick={() => handleClassSelect(classobj)}
                  >
                    {classobj.name}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {
        selectedClass?._id 
        &&
        (<div className="flex flex-col w-[300px] mx-auto gap-4 ">
          <Button onClick={()=>router('/takeattendance')} className="shadow-sm shadow-white">
            <FaClipboardList/>
            Take Attendance
            </Button>
          <Button onClick={()=>router('/classAttendance')} className="shadow-sm shadow-white">
            <ImBooks/>
            Class Attendance
            </Button>
          <Button onClick={()=>router('/viewStudentList')} className="shadow-sm shadow-white">
            <FaGraduationCap/>
            Student Attendance
            </Button>
          <Button className="shadow-sm shadow-white"><LuScrollText/> Student List</Button>
          <Button className="shadow-sm shadow-white"><FaUser /> Add Student</Button>
        </div>)
      }
    </div>
  );
};

export default Class;
