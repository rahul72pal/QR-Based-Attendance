import { setClassId, setClassName } from "@/slices/classReducer";
import { RootState } from "@/slices/store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Class {
    _id: string | null;
    name: string | null;
  }

// type Props = {}

const GlobalClassSelector = () => {
  const [classList, setClassList] = useState<Class[]>();
  const classObj = useSelector((state: RootState) => state.class);
  const [selectedClass, setSelectedClass] = useState<Class | null>(classObj);
  const dispatch = useDispatch();
  const storedClasses = JSON.parse(localStorage.getItem("classes") || "[]");
  console.log("Stored classes:", storedClasses);

  const handleClassSelect = (classobj: Class) => {
      setSelectedClass(classobj);
      dispatch(setClassId(classobj._id));
      dispatch(setClassName(classobj.name));
    };

    useEffect(() => {
        if(storedClasses.length > 0){
            setClassList(storedClasses)
        }
      }, []);

  return  <div className="">
    <div className="flex flex-col sm:text-xs p-4 w-full text-center gap-1 mx-auto justify-center items-center ">
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
  </div> ;
};

export default GlobalClassSelector;
