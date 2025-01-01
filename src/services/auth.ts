import toast from "react-hot-toast";
import { apiConnector } from "./axios";

let URL = "";

if (import.meta.env.VITE_NODE_ENV === "development") {
  URL = import.meta.env.VITE_LOCALHOST_URL;
} else {
  URL = import.meta.env.VITE_API_URL;
}

interface signupData {
  username: string;
  email: string;
  password: string;
}

interface loginData {
  email: string;
  password: string;
}

export const SignupTeacher = async (data: signupData) => {
  const toastId = toast.loading("Wait..");
  try {
    // console.log(process.env.REACT_APP_API_URL);
    const response = await apiConnector(
      "POST",
      `${URL}/auth/signUp-teacher`,
      data
    );

    if (!response) {
      toast.error("Error in Signup!");
      return undefined; // Return undefined if response is not valid
    }
    console.log(response);

    return response.data; // Cast response.data to Student[]
  } catch (error: any) {
    console.log(error);
    toast.error(`An error ${error.response.data.message}`); // Optional: Display an error toast
    return undefined; // Return undefined in case of an error
  } finally {
    toast.dismiss(toastId);
  }
};

export const login = async (data: loginData) => {
  const toastId = toast.loading("Wait..");
  try {
    // console.log(process.env.REACT_APP_API_URL);
    const response = await apiConnector("POST", `${URL}/auth/login`, data);

    if (!response) {
      toast.error("Error in Login!");
      return undefined; // Return undefined if response is not valid
    }
    console.log(response);

    return response.data; // Cast response.data to Student[]
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.message); // Optional: Display an error toast
    return undefined; // Return undefined in case of an error
  } finally {
    toast.dismiss(toastId);
  }
};

export const SendOtp = async (email: string, name: string) => {
  const toastId = toast.loading("Wait..");
  try {
    // console.log(process.env.REACT_APP_API_URL);
    const response = await apiConnector("POST", `${URL}/auth/sendOTP`, {
      email, name
    });

    if (!response) {
      toast.error("Error in OTP!");
      return undefined; // Return undefined if response is not valid
    }
    console.log(response);

    toast.success(response.data?.message);
    return response.data; // Cast response.data to Student[]
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.message); // Optional: Display an error toast
    return undefined; // Return undefined in case of an error
  } finally {
    toast.dismiss(toastId);
  }
};
