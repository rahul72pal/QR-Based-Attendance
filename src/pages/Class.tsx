import { Button } from "@/components/ui/button";
import { getAllClass } from "@/services/class";
// import { RootState } from "@/slices/store";

import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";

// import { IoArrowBackSharp } from "react-icons/io5";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
interface Class {
  _id: string | null;
  name: string | null;
}

const Class = () => {
  const [classList, setClassList] = useState<Class[]>();
  // const classObj = useSelector((state: RootState) => state.class);
  // const router = useNavigate();

  const fetchAllClasses = async () => {
    try {
      const result = await getAllClass();
      console.log("All classes = ", result?.classes);
      if (result) {
        setClassList(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllClasses();
  }, []);

  return (
    <div className="">
      {/* <Button className="p-5 mt-6 ml-6 sm:text-xs" onClick={() => router(-1)}>
        <IoArrowBackSharp />
        Back
      </Button> */}

      <p className="text-2xl text-center py-6">All Class's</p>
      {/* <div className="flex justify-between items-center py-3 gap-2">
        <div className="flex flex-col sm:text-xs p-4 w-[50%] text-center gap-1 mx-auto">
          <p className="text-xs text-center">Choose Class</p>
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-[#161D29] sm:text-xs border text-sm border-white w-[150px] mb-1 py-2 rounded-xl">
              {selectedClass?.name ? selectedClass.name : "Select Class"}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[150px] mt-2  flex flex-col ">
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
      </div> */}
        <div className="flex flex-col w-[300px] mx-auto gap-4 ">
          {classList !== undefined &&
        classList.length > 0 &&
        classList.map((classobj) => (
          <Button
            key={classobj._id}
            // onClick={() => router("/takeattendance")}
            className="shadow-sm shadow-white sm:text-xs flex justify-between"
          >
            <FaClipboardList />
            <p>{classobj.name}</p>
            <div className="flex justify-center items-center gap-4">
            <BiSolidEditAlt/>
            <MdDelete/>
            </div>
          </Button>
        ))}

        </div>

    </div>
  );
};

export default Class;
