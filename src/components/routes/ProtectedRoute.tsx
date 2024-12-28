import React, { useEffect } from "react";
// import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/slices/store";

type Props = {
  children: React.ReactNode;
};


const ProtectedRoute = (props: Props) => {
  const navigate = useNavigate();
  // const token = Cookies.get("token");
  // const teacherCookie = Cookies.get("teacher");
  const teacher = useSelector((state: RootState)=> state.teacher)
  console.log("Token ====", teacher, teacher.token === null);

  useEffect(() => {
    if (teacher.token === null) {
      navigate('/login');
    }
  }, [teacher.token, teacher, navigate]);

  return <>{props.children}</>;
};

export default ProtectedRoute;