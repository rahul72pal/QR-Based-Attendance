import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

let teacher: object;

const ProtectedRoute = (props: Props) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const teacherCookie = Cookies.get("teacher");

  // Check if the teacher cookie exists before parsing
  if (teacherCookie) {
    try {
      teacher = JSON.parse(teacherCookie);
    } catch (error) {
      console.error("Error parsing teacher cookie:", error);
    }
  }

  useEffect(() => {
    if (!token && !teacher) {
      navigate('/login');
    }
  }, [token, teacher, navigate]);

  return <>{props.children}</>;
};

export default ProtectedRoute;