// class/getAll

import toast from "react-hot-toast";
import { apiConnector } from "./axios";
// import { useDispatch, useSelector } from "react-redux";
import { setClasses } from "@/slices/classReducer";
// import { RootState } from "@/slices/store";
import { Dispatch } from "@reduxjs/toolkit";

let URL = "";

if (import.meta.env.VITE_NODE_ENV === "development") {
  URL = import.meta.env.VITE_LOCALHOST_URL;
} else {
  URL = import.meta.env.VITE_API_URL;
}

export const getAllClass = async (dispatch: Dispatch, classobj: any) => {
  console.log(classobj);
  const toastId = toast.loading("Wait..");
  try {
    const response = await apiConnector("GET", `${URL}/class/getAll`);

    if (!response) {
      toast.error("Error in Attendance!");
      return undefined; // Return undefined if response is not valid
    }

    const classes = response.data?.classes || [];

    dispatch(setClasses(classes));
    localStorage.setItem("classes", JSON.stringify(classes));
    
    console.log("Classes stored in localStorage:", classes);
    return classes; // Return the classes array
  } catch (error: any) {
    console.log(error);
    toast.error(error?.response?.data?.message || "An error occurred.");
    return undefined; // Return undefined in case of an error
  } finally {
    toast.dismiss(toastId);
  }
};


export const createClass = async (name: string) => {
  try {
    const result = await apiConnector("POST", `${URL}/class/createClass`, {
      name,
    });

    if (!result) {
      toast.error("Error in Add Class!");
      return undefined;
    }

    if (result.status === 203) {
      toast.error("No Permission Add Class!");
      return undefined;
    }

    console.log("Create Class Result", result);

    return result.data;
  } catch (error: any) {
    console.log(error);
    toast.error("Error!");
    return undefined;
  }
};

export const getClassAllAttendance = async (class_id: string) => {
  const toastId = toast.loading("Wait..");
  try {
    // console.log(process.env.REACT_APP_API_URL);
    const response = await apiConnector(
      "GET",
      `${URL}/class/allAttendance/${class_id}`
    );

    if (!response) {
      toast.error("Error in Attendance!");
      return undefined; // Return undefined if response is not valid
    }
    console.log(response);
    toast.success("Attendance");
    return response.data; // Cast response.data to Student[]
  } catch (error: any) {
    console.log(error);
    toast.error(error?.response.data.message); // Optional: Display an error toast
    return undefined; // Return undefined in case of an error
  } finally {
    toast.dismiss(toastId);
  }
};

export const deleteClassById = async (class_id: string| null)=>{
  const toastId = toast.loading("Deleting..");
  try {
    // console.log(process.env.REACT_APP_API_URL);
    const response = await apiConnector(
      "DELETE",
      `${URL}/class/delete/${class_id}`
    );

    if (!response) {
      toast.error("Error in Attendance!");
      return undefined; // Return undefined if response is not valid
    }
    console.log(response);
    toast.success("Delete");
    return response; // Cast response.data to Student[]
  } catch (error: any) {
    console.log(error);
    toast.error(error?.response.data.message); // Optional: Display an error toast
    return undefined; // Return undefined in case of an error
  } finally {
    toast.dismiss(toastId);
  }
}
