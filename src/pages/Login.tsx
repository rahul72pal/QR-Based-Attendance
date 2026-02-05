import { login } from "@/services/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import {
  setInstitueAdd,
  setInstitueName,
  setName,
  setToken,
} from "@/slices/teacherReducer";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useNavigate();
  const dispatch = useDispatch();

  function setTokenWithExpiration(token: any, teacher: any) {
    const expirationTime = Date.now() + 180 * 24 * 60 * 60 * 1000; // 6 months in milliseconds
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiration", expirationTime as any);
    localStorage.setItem("teacher", JSON.stringify(teacher));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        email,
        password,
      };
      const response = await login(data);
      if (response) {
        console.log("Login ApI response =>", response);
        // Store the token in cookies
        Cookies.set("token", response.token, { expires: 180 });
        Cookies.set("teacher", JSON.stringify(response.teacher), {
          expires: 7,
        });

        // Store the token in local storage
        // Usage
        setTokenWithExpiration(response.token, response.teacher);
        dispatch(setToken(response.token));
        dispatch(setName(response.teacher.name));
        dispatch(setInstitueName(response.teacher.institution_name));
        dispatch(setInstitueAdd(response.teacher.institude_address));

        // Redirect to the class page
        router("/class");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      {/* Left Side - Branding & Hero */}
      <div className="hidden lg:flex w-1/2 relative bg-card overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-150 translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
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
            Welcome Back to <span className="text-primary">Smart Attendance</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Track attendance effortlessly with QR code scanning. Secure, fast, and reliable for modern institutions.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs text-muted-foreground">
                  {/* Placeholder avatars */}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground font-medium">1,000+ institutions trust us</p>
          </div>
        </div>

        <div className="relative z-10 text-xs text-muted-foreground">
          &copy; 2026 Smart Attendance. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        {/* Mobile Background Glow */}
        <div className="absolute top-0 right-0 w-full h-full bg-primary/5 blur-3xl -z-10 lg:hidden pointer-events-none"></div>

        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold font-title tracking-tight mb-2">Sign in to your account</h2>
            <p className="text-muted-foreground">Enter your credentials to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-12 w-full rounded-md border border-input bg-secondary/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 focus:bg-card"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-12 w-full rounded-md border border-input bg-secondary/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 focus:bg-card"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="inline-flex items-center justify-center rounded-md text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-background hover:bg-white hover:text-black h-12 w-full shadow-glow hover:scale-[1.02] duration-200"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <span
              onClick={() => router("/signup")}
              className="font-bold text-primary hover:text-primary/80 cursor-pointer transition-colors"
            >
              Create one now
            </span>
          </p>

          <p className="text-center text-xs text-muted-foreground mt-8">
            By signing in, you agree to our <a href="#" className="underline hover:text-primary">Terms of Service</a> and <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
