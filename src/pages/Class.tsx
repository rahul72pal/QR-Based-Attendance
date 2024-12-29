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
import { useDispatch, useSelector } from "react-redux";
// import { setClasses } from "@/slices/classReducer";
import { RootState } from "@/slices/store";
interface Class {
  _id: string | null;
  name: string | null;
}

const Class = () => {
  const [classList, setClassList] = useState<Class[]>();
  const classObj = useSelector((state: RootState)=>state.class)
  // const classObj = useSelector((state: RootState) => state.class);
  // const router = useNavigate();
  const dispatch = useDispatch();

  const fetchAllClasses = async () => {
    try {
      const result = await getAllClass(dispatch, classObj);
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

      <p className="text-2xl text-center py-6">All Class's</p>
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
