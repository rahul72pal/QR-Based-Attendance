import React, { useEffect, ReactNode } from "react"; // Import React and ReactNode
import { RootState } from "@/slices/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface ClassIdComponentProps {
  children: ReactNode;
}

const ClassIdComponent: React.FC<ClassIdComponentProps> = ({ children }) => {
  const router = useNavigate();
  const classobj = useSelector((state: RootState) => state.class);
  const storedClasses = JSON.parse(localStorage.getItem("classes") || "[]");
  console.log("Stored classes:", storedClasses);

  useEffect(() => {
    if (!storedClasses) {
      router("/class");
    }
  }, [classobj._id, router]);

  if (!storedClasses) {
    return null;
  }

  return <div>{children}</div>;
};

export default ClassIdComponent;
