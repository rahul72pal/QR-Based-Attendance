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
  const teacher = useSelector((state: RootState) => state.teacher)
  // const teacherCookie = Cookies.get("teacher");
  const [isModalOpen, setOpenModal] = useState<boolean>(false);

  console.log(teacher);

  return (
    <>
      <div className="flex h-full w-full max-w-7xl mx-auto p-4 py-6 gap-2 justify-between items-center bg-transparent z-50">
        {/* Left: Logo */}
        <div
          onClick={() => router("/")}
          className="h-full flex justify-center items-center gap-3 cursor-pointer group"
        >
          {!teacher.token && (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-background font-bold text-xl font-title shadow-glow group-hover:scale-105 transition-transform duration-300">
              A
            </div>
          )}
          {!teacher.token && (
            <span className="text-xl font-bold font-title text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
              Attendance
            </span>
          )}
        </div>

        {/* Right: Actions */}
        {!teacher.token ? (
          <div className="h-full flex gap-6 justify-center items-center">
            <button
              // Hardcoded navigation like in the reference visuals (placeholder for now)
              className="hidden md:block text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              className="hidden md:block text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Services
            </button>
            <button
              className="hidden md:block text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer mr-4"
            >
              About
            </button>

            <button
              onClick={() => router("/login")}
              className="text-sm font-bold text-foreground hover:text-primary transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => router("/signup")}
              className="px-6 py-2.5 bg-primary text-background font-bold rounded-full text-sm hover:shadow-glow hover:scale-105 transition-all duration-300"
            >
              Sign up
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-4">
            <p className="text-sm font-medium text-muted-foreground">Welcome, <span className="text-primary font-bold">{teacher?.name || "Guest"}</span></p>
            <button
              className="p-2 rounded-full hover:bg-secondary/50 transition-colors group"
              onClick={() => setOpenModal(true)}
              title="Logout"
            >
              <RiLogoutCircleLine className="text-2xl text-primary group-hover:text-red-400 transition-colors" />
            </button>
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
