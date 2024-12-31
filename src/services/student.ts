import toast from "react-hot-toast";
import { apiConnector } from "./axios";

let URL = "";

if (import.meta.env.VITE_NODE_ENV === "development") {
  URL = import.meta.env.VITE_LOCALHOST_URL;
} else {
  URL = import.meta.env.VITE_API_URL;
}

// Define the structure of the student data if known
interface Student {
  id: string;
  name: string;
  roll_number: number;
  attendance_percentage: number;
  // Add other properties as needed
}

interface CreateStudentResponse {
  message: string;
  data: Student; // The data field should be of type Student
}

interface StudentDeatils {
  createdAt: string;
  name: string;
  roll_number: number;
  updatedAt: string;
  __v: number;
  _id: number;
}

export const getAllStudents = async (
  class_id: string | null
): Promise<Student[] | undefined> => {
  const toastId = toast.loading("Wait..");
  try {
    // console.log(process.env.REACT_APP_API_URL);
    const response = await apiConnector(
      "GET",
      `${URL}/class/students/${class_id}`
    );

    if (!response) {
      toast.error("Error in Students!");
      return undefined; // Return undefined if response is not valid
    }

    return response.data as Student[]; // Cast response.data to Student[]
  } catch (error) {
    console.log(error);
    toast.error("An error occurred while fetching students."); // Optional: Display an error toast
    return undefined; // Return undefined in case of an error
  } finally {
    toast.dismiss(toastId);
  }
};

export const createStudents = async (
  class_id: string | null,
  name: string,
  fatherName: string,
  date: Date | undefined
): Promise<CreateStudentResponse | undefined> => {
  const toastId = toast.loading("Wait..");
  try {
    // console.log(process.env.REACT_APP_API_URL);
    const response = await apiConnector("POST", `${URL}/students/createStudent`, {
      name,
      class_id,
      father_name: fatherName,
      dob: date
    });

    if (!response) {
      toast.error("Error in Add Students!");
      return undefined; // Return undefined if response is not valid
    }

    return response.data; // Cast response.data to Student[]
    // return {
    //     "message": "Student enrolled successfully",
    //     "data": {
    //       "name": "Rahul Pal testing",
    //       "roll_number": 36,
    //       "class_id": "67360c3c4d7e24fe5b08fe9b"
    //     }
    //   }
  } catch (error) {
    console.log(error);
    toast.error("An error occurred while Adding students."); // Optional: Display an error toast
    return undefined; // Return undefined in case of an error
  } finally {
    toast.dismiss(toastId);
  }
};

export const parentAttendance = async (
  class_id: string | null,
  name: string,
  roll_no: number
): Promise<StudentDeatils | undefined> => {
  const toastId = toast.loading("Wait..");
  try {
    // console.log(process.env.REACT_APP_API_URL);
    const response = await apiConnector(
      "POST",
      `${URL}/students/parentAttendance`,
      {
        name,
        class_id,
        roll_no,
      }
    );

    if (!response) {
      toast.error("Error in Add Students!");
      return undefined; // Return undefined if response is not valid
    }
    toast.success("Attendance!");
    return response.data; // Cast response.data to Student[]
  } catch (error) {
    console.log(error);
    toast.error("An error occurred while Adding students."); // Optional: Display an error toast
    return undefined; // Return undefined in case of an error
  } finally {
    toast.dismiss(toastId);
  }
};

export const updateStudent = async(
  student_id: string | null,
  name: string,
  father_name: string,
  dob: Date | undefined
)=>{
  const toastId = toast.loading("Update...");
  try {
    const response = await apiConnector(
      "POST",
      `${URL}/students/updateStudent/${student_id}`,
      {
        name,
        father_name,
        dob,
      }
    );

    if (!response) {
      toast.error("Error in Update Students!");
      return undefined; // Return undefined if response is not valid
    }

    toast.success("Updated!");
    return response.data; // Cast response.data to Student[]
  } catch (error) {
    console.log(error);
    toast.error("An error occurred while Updating students."); // Optional: Display an error toast
    return undefined; // Return undefined in case of an error
  } finally {
    toast.dismiss(toastId);
  }
}
