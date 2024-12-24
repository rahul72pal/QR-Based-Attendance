import React, { useEffect, useState } from "react";
// import { getAllStudents } from "../../services/student";
import Modal from "../modal/modal";

import QRScanner from "../QRScanner";
// import { getAttdance } from "@/services/attendance";
// import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/slices/store";
import {  CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { IoArrowBackSharp } from "react-icons/io5";
import GlobalClassSelector from "../general/GlobalClassSelector";
// import toast from "react-hot-toast";

// Define the structure of the student data if known


function cn(...classes:any) {
  return classes.filter(Boolean).join(' ');
}

const TakeAttendance: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  // const router = useNavigate();
  // const classobj = useSelector((state: RootState)=> state.class);
  // const
  // const class_id = classObj ? classobj._id : "";
  const classObj = useSelector((state: RootState) => state.class);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  

  useEffect(() => {
    // attendance();
  }, []);

  const formatDate = (date: Date | undefined): string => {
    if (!date) {
      // toast.error("Error in Date");
      return "Invalid date"; // Handle the undefined case as needed
    }
  
    return format(date, 'yyyy-MM-dd');
  };

  // console.log(classObj);
  console.log(classObj, date, formatDate(date).toString());

  return (
    <div className="bg-[#000814]">
      {/* <Button onClick={() => router(-1)} className="p-4 mt-6 ml-6 sm:text-xs">
        <IoArrowBackSharp/>
        Back
      </Button> */}

      <GlobalClassSelector/>

      <p className="text-center py-6 text-xl sm:text-lg">{classObj.name}</p>
      <div className="text-white bg-[#000814] min-h-[70vh] text-center flex flex-col justify-evenly">
        {/* Choose class */}
        {/* <div className="bg-[#000814] py-3">
          {showStudentList && students && students.length > 0 && (
            <StudentList students={students} title={`Student Attendance ${'2024-11-09'}`} />
          )}
        </div> */}

        <div>
          <Popover >
            <PopoverTrigger className="text-white bg-[#161D29] sm:w-fit" asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start sm:text-xs text-left font-normal hover:text-white hover:bg-[#161D29] text-white bg-[#161D29]",
                  !date && "text-muted-foreground text-white bg-[#161D29] "
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 sm:w-2 sm:h-2" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 text-white bg-[#161D29]">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {!isModalOpen && (
          <div className="w-[75%] bg-[#000814] inset-8 mx-auto text-center">
            <button
            disabled={!date}
              onClick={openModal}
              className={`text-black bg-[#FFD52A] 
              py-2 mb-16 rounded-xl font-semibold sm:text-xl
               text-4xl w-full mx-auto ${date ? "opacity-95": "opacity-15"}`}
            >
              Take
            </button>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <QRScanner class_id={classObj._id ? classObj._id : ""} date={formatDate(date).toString()} onClose={closeModal} />
        </div>
      </Modal>
    </div>
  );
};

export default TakeAttendance;
