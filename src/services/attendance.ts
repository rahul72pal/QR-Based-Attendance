import toast from "react-hot-toast";
import { apiConnector } from "./axios";
let URL = '';

if(import.meta.env.VITE_NODE_ENV === 'development'){
    URL = import.meta.env.VITE_LOCALHOST_URL
}else{
    URL = import.meta.env.VITE_API_URL
}


interface AttendanceData{
    class_id: string,
    date: string,
    attendance_data: any
}

interface getAttdanceData{
    class_id: string,
    date: string
}

interface getStudentAttendance{
    class_id: string,
    student_id?: string
}


export const saveAttdance = async (data: AttendanceData ) => {
    const toastId = toast.loading("Wait..");
    console.log(data);
    try {
        // console.log(process.env.REACT_APP_API_URL);
        const response = await apiConnector('POST', `${URL}/attendance/saveattendance`, data);
        
        if (!response) {
            toast.error("Error in Attendance!");
            return undefined; // Return undefined if response is not valid
        }
        
        return response.data; // Cast response.data to Student[]
    } catch (error) {
        console.log(error);
        toast.error("An error occurred while save Attendance."); // Optional: Display an error toast
        return undefined; // Return undefined in case of an error
    } finally {
        toast.dismiss(toastId);
    }
};

export const getAttdance = async (data: getAttdanceData) => {
    console.log("Atttendace data",data);
    const toastId = toast.loading("Wait..");
    try {
        // console.log(process.env.REACT_APP_API_URL);
        const response = await apiConnector('POST', `${URL}/attendance/get`, { date: data.date, class_id: data.class_id });
        
        if (!response) {
            toast.error("Error in Attendance!");
            return undefined; // Return undefined if response is not valid
        }
        
        return response.data; // Cast response.data to Student[]
    } catch (error) {
        console.log(error);
        toast.error("An error occurred while save Attendance."); // Optional: Display an error toast
        return undefined; // Return undefined in case of an error
    } finally {
        toast.dismiss(toastId);
    }
};

export const getStudentAttendance = async(data: getStudentAttendance)=>{
    const toastId = toast.loading("Wait..");
    try {
        const response = await apiConnector("POST", `${URL}/attendance/getStudent`, data);

        if(!response){
            toast.error("Error in Student Attendance!");
            return undefined; 
        }
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error("An error occurred while save Attendance.");
        return undefined
    }finally {
        toast.dismiss(toastId);
    }
}