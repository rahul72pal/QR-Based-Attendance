import toast from "react-hot-toast";
import { apiConnector } from "./axios";

let URL = '';

if(import.meta.env.VITE_NODE_ENV === 'development'){
    URL = import.meta.env.VITE_LOCALHOST_URL
}else{
    URL = import.meta.env.VITE_API_URL
}

// Define the structure of the student data if known
interface Student {
    id: string;
    name: string;
    roll_number: number;
    // Add other properties as needed
}

export const getAllStudents = async (class_id: string | null): Promise<Student[] | undefined> => {
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