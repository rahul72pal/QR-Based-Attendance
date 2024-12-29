import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setInstitueAdd, setInstitueName, setName, setToken } from "@/slices/teacherReducer";
import { setClasses } from "@/slices/classReducer";

interface TeacherLogoutProps {
  onClose: () => void; // Function to close the modal
}

const TeacherLogout: React.FC<TeacherLogoutProps> = ({ onClose }) => {
  const router = useNavigate();
  const dispatch = useDispatch();

  const handleRemoveCookies = () => {
    try {
      Cookies.remove("token");
      Cookies.remove("teacher");
      // Remove the token from local storage
      localStorage.removeItem("token");
      dispatch(setToken(null))

      // Remove the teacher information from local storage
      localStorage.removeItem("teacher");
      localStorage.removeItem("classes")
      dispatch(setName(null))
      dispatch(setInstitueName(null))
      dispatch(setInstitueAdd(null))
      dispatch(setClasses(null))
      router("/login");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gray-800 p-6 w-[80%] mx-auto flex flex-col gap-10 rounded-md text-center ">
      <p className="text-xl">Are You Want to Logout</p>
      <div className="flex flex-col gap-5">
        <Button onClick={handleRemoveCookies}>Logout</Button>
        <Button onClick={onClose}>cancel</Button>
      </div>
    </div>
  );
};

export default TeacherLogout;
