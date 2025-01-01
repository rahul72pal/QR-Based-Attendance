import { SignupTeacher, SendOtp } from "@/services/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import {
  setInstitueAdd,
  setInstitueName,
  setToken,
  setName,
} from "@/slices/teacherReducer";
import OTPInput from "@/components/general/OTPInput";
import { Button } from "@/components/ui/button";

const Signup: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [institutionName, setInstitutionName] = useState<string>("");
  const [instituteAddress, setInstituteAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const router = useNavigate();

  const handleOtpSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mobile number validation: Ensure it's 10 digits
      const mobileNumberRegex = /^\d{10}$/;
      if (!mobileNumberRegex.test(mobileNumber)) {
        alert("Mobile number must be exactly 10 digits.");
        setLoading(false);
        return;
      }

      const response = await SendOtp(email, username);
      if (response) {
        setOtpSent(true);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    setLoading(true);

    try {
      const data = {
        username,
        email,
        password,
        mobile_number: mobileNumber, // Ensure this is sent as a string
        institution_name: institutionName,
        institute_address: instituteAddress,
        otp: otp,
      };
      const response = await SignupTeacher(data);
      if (response) {
        console.log(response);
        Cookies.set("token", response.token, { expires: 7 });
        Cookies.set("teacher", JSON.stringify(response.teacher), {
          expires: 7,
        });
        localStorage.setItem("token", response.token);
        dispatch(setToken(response.token));
        dispatch(setName(response.teacher.name));
        dispatch(setInstitueName(response.teacher.institution_name));
        dispatch(setInstitueAdd(response.teacher.institude_address));
        localStorage.setItem("teacher", JSON.stringify(response.teacher));
        router("/class");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleOtpsubmit = (otp: string) => {
    console.log(otp);
    setOtp(otp);
  };

  return (
    <div className="flex items-center justify-center min-h-[100%] h-full bg-[#000814] ">
      {otpSent ? (
        <div className="flex flex-col items-center justify-center mt-[-300px] gap-6">
          <div>
            <h1 className="italic text-center px-8 text-[16px]">
              OTP Sent to your {email}, it Valide up to 5 min
            </h1>
          </div>
          <OTPInput length={4} onSubmit={handleOtpsubmit} />
          <Button disabled={loading} onClick={()=>handleSubmit()} className="text-xl bg-[#FFD52A] text-[#000814] py-5">Submit</Button>
        </div>
      ) : (
        <div className="p-6 bg-[#161D29] rounded shadow-md w-96 sm:mt-[10px]">
          <h1 className="text-3xl sm:text-xl font-semibold text-center">
            Sign Up
          </h1>
          <p className="text-center sm:text-sm">Create your account</p>
          <form onSubmit={handleOtpSend} className="mt-4 sm:text-sm">
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full sm:text-xs bg-[#000814] outline-none border-none p-2 rounded"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:text-xs bg-[#000814] outline-none border-none p-2 rounded"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full sm:text-xs bg-[#000814] outline-none border-none p-2 rounded"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mobileNumber" className="block mb-1">
                Mobile Number
              </label>
              <input
                type="text"
                id="mobileNumber"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full sm:text-xs bg-[#000814] outline-none border-none p-2 rounded"
                placeholder="Enter your mobile number"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="institutionName" className="block mb-1">
                Institution Name
              </label>
              <input
                type="text"
                id="institutionName"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                className="w-full sm:text-xs bg-[#000814] outline-none border-none p-2 rounded"
                placeholder="Enter your institution name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="instituteAddress" className="block mb-1">
                Institution Address
              </label>
              <input
                type="text"
                id="instituteAddress"
                value={instituteAddress}
                onChange={(e) => setInstituteAddress(e.target.value)}
                className="w-full sm:text-xs bg-[#000814] outline-none border-none p-2 rounded"
                placeholder="Enter your institution address"
                required
              />
            </div>
            <div className="mt-4">
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-white text-black p-2 rounded "
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signup;
