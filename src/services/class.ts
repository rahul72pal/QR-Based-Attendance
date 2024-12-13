// class/getAll

import toast from "react-hot-toast";
import { apiConnector } from "./axios";

let URL = '';

if(import.meta.env.VITE_NODE_ENV === 'development'){
    URL = import.meta.env.VITE_LOCALHOST_URL
}else{
    URL = import.meta.env.VITE_API_URL
}


export const getAllClass = async () => {
    const toastId = toast.loading("Wait..");
    try {
        // console.log(process.env.REACT_APP_API_URL);
        const response = await apiConnector('GET', `${URL}/class/getAll`);
        
        if (!response) {
            toast.error("Error in Attendance!");
            return undefined; // Return undefined if response is not valid
        }
        console.log(response);
        
        return response.data; // Cast response.data to Student[]
    } catch (error: any) {
        console.log(error);
        toast.error(error?.response.data.message); // Optional: Display an error toast
        return undefined; // Return undefined in case of an error
    } finally {
        toast.dismiss(toastId);
    }
};