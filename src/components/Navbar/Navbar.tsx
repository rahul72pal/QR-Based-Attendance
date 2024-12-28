import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
import { RiLogoutCircleLine } from "react-icons/ri";
import Modal from "../modal/modal";
import TeacherLogout from "../teacher/TeacherLogout";
import { useSelector } from "react-redux";
import { RootState } from "@/slices/store";

const Navbar: React.FC = () => {
  const router = useNavigate();
  // const token = Cookies.get("token");
  const teacher = useSelector((state: RootState)=> state.teacher)
  // const teacherCookie = Cookies.get("teacher");
  const [isModalOpen, setOpenModal] = useState<boolean>(false);

  console.log(teacher);

  return (
    <>
      <div
        className="
      flex h-full w-full 
      m-0 p-4 py-4 gap-2 justify-between items-center
    "
      >
        {/* left box  */}
        <div
          onClick={() => router("/")}
          className="h-full flex justify-center items-center gap-2"
        >
          {!teacher.token && <img
            className="w-[40px] h-[40px] rounded-full"
            src="./assets/img12.png"
            alt="Attendance Logo"
          />}
         {!teacher.token && <span className="leading-[20px] select-none sm:text-lg font-title text-[20px]">
            Attendance
          </span>}
        </div>

        {!teacher.token ? (
          <div className="h-full flex gap-2 justify-center items-center text-xs">
            <button
              onClick={() => router("/login")}
              className="px-2 py-3 bg-[#161D29] rounded-lg text-xs"
            >
              Login
            </button>
            <button
              onClick={() => router("/signup")}
              className="px-2 py-3 bg-[#161D29] rounded-lg text-xs"
            >
              Sign up
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center ">
            <p className="sm:text-xs">Welcome {teacher?.name || "Guest"}</p>
            <span className="p-2" onClick={()=>setOpenModal(true)}>
              <RiLogoutCircleLine className="text-2xl text-[#FFD52A]" />
            </span>
          </div>
        )}
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setOpenModal(false)}>
          <TeacherLogout onClose={() => setOpenModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default Navbar;
