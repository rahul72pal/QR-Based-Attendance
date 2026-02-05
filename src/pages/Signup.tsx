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

  const CustomInput = ({ id, label, value, onChange, placeholder, type = "text" }: any) => (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium leading-none text-foreground">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="flex h-11 w-full rounded-md border border-input bg-secondary/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 focus:bg-card"
        placeholder={placeholder}
        required
      />
    </div>
  );

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      {/* Left Side - Branding & Value Prop */}
      <div className="hidden lg:flex w-1/2 relative bg-card overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-110 -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        {/* Logo */}
        <div
          onClick={() => router("/")}
          className="relative z-10 flex items-center gap-3 cursor-pointer"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-background font-bold text-xl font-title shadow-glow">
            A
          </div>
          <span className="text-xl font-bold font-title text-foreground tracking-tight">
            Attendance
          </span>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-lg mb-20">
          <h1 className="text-5xl font-bold font-title mb-6 leading-tight">
            Join the Future of <br /> <span className="text-primary">Attendance Tracking</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10">
            Create your account and start managing attendance with cutting-edge QR technology in minutes.
          </p>

          <div className="space-y-4">
            {[
              "Instant QR code scanning",
              "Real-time analytics & reporting",
              "Secure & reliable cloud storage",
              "Parent notifications"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">✓</div>
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-xs text-muted-foreground">
          &copy; 2026 Smart Attendance. All rights reserved.
        </div>
      </div>

      {/* Right Side - Signup Layout */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
        {/* Mobile Background Glow */}
        <div className="absolute top-0 right-0 w-full h-full bg-primary/5 blur-3xl -z-10 lg:hidden pointer-events-none"></div>

        {otpSent ? (
          <div className="w-full max-w-md space-y-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-3xl mx-auto mb-4">✉</div>
              <h2 className="text-3xl font-bold font-title mb-2">Verify your Email</h2>
              <p className="text-muted-foreground">
                We've sent a verification code to <span className="text-foreground font-medium">{email}</span>. <br />
                It is valid for 5 minutes.
              </p>
            </div>

            <OTPInput length={4} onSubmit={handleOtpsubmit} />

            <Button
              disabled={loading}
              onClick={() => handleSubmit()}
              className="w-full bg-primary text-background font-bold py-6 text-lg hover:bg-white hover:text-black shadow-glow hover:scale-[1.02] transition-all duration-200"
            >
              {loading ? "Verifying..." : "Verify & Create Account"}
            </Button>

            <button
              onClick={() => setOtpSent(false)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors mt-4"
            >
              Wrong email? Go back
            </button>
          </div>
        ) : (
          <div className="w-full max-w-md space-y-6">
            <div className="text-center lg:text-left mb-8">
              <h2 className="text-3xl font-bold font-title tracking-tight mb-2">Create your account</h2>
              <p className="text-muted-foreground">Get started with your free account today</p>
            </div>

            <form onSubmit={handleOtpSend} className="space-y-4">
              <CustomInput
                id="name"
                label="Full Name"
                placeholder="John Doe"
                value={username}
                onChange={(e: any) => setUserName(e.target.value)}
              />

              <CustomInput
                id="email"
                label="Email Address"
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomInput
                  id="password"
                  label="Password"
                  placeholder="Create password"
                  type="password"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
                <CustomInput
                  id="mobileNumber"
                  label="Mobile Number"
                  placeholder="10-digit number"
                  value={mobileNumber}
                  onChange={(e: any) => setMobileNumber(e.target.value)}
                />
              </div>

              <div className="space-y-4 pt-2">
                <CustomInput
                  id="institutionName"
                  label="Institution Name"
                  placeholder="e.g. Springfield High School"
                  value={institutionName}
                  onChange={(e: any) => setInstitutionName(e.target.value)}
                />
                <CustomInput
                  id="instituteAddress"
                  label="Institution Address"
                  placeholder="City, State"
                  value={instituteAddress}
                  onChange={(e: any) => setInstituteAddress(e.target.value)}
                />
              </div>

              <div className="pt-4">
                <button
                  disabled={loading}
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-background hover:bg-white hover:text-black h-12 w-full shadow-glow hover:scale-[1.02] duration-200"
                >
                  {loading ? "Sending OTP..." : "Create Account"}
                </button>
              </div>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <span
                onClick={() => router("/login")}
                className="font-bold text-primary hover:text-primary/80 cursor-pointer transition-colors"
              >
                Sign in
              </span>
            </p>

            <p className="text-center text-xs text-muted-foreground mt-4">
              By creating an account, you agree to our <a href="#" className="underline hover:text-primary">Terms of Service</a> and <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
