import toast from "react-hot-toast";
import { apiConnector } from "./axios";

// const URL = process.env.REACT_APP_API_URL;
const URL = "http://localhost:8000";

// Define the structure of the student data if known
interface Student {
    id: string;
    name: string;
    // Add other properties as needed
}

export const getAllStudents = async (class_id: string): Promise<Student[] | undefined> => {
    const toastId = toast.loading("Wait..");
    try {
        // console.log(process.env.REACT_APP_API_URL);
        const response = await apiConnector('GET', `${URL}/class/students/${class_id}`);
        
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