import { login } from "@/services/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setInstitueAdd, setInstitueName, setName, setToken } from "@/slices/teacherReducer";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useNavigate();
  const dispatch = useDispatch();

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
        console.log("Login ApI response =>",response);
        // Store the token in cookies
        Cookies.set("token", response.token, { expires: 7 });
        Cookies.set("teacher", JSON.stringify(response.teacher), {
          expires: 7,
        });

        // Store the token in local storage
        localStorage.setItem("token", response.token);
        dispatch(setToken(response.token))
        dispatch(setName(response.teacher.name))
        dispatch(setInstitueName(response.teacher.institution_name))
        dispatch(setInstitueAdd(response.teacher.institude_address))
        localStorage.setItem("teacher", JSON.stringify(response.teacher));

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
    <div className="flex items-center justify-center h-[80vh] bg-[#000814]">
      <div className="p-6 bg-[#161D29] rounded shadow-md w-96">
        <h1 className="text-3xl font-semibold text-center">Sign In</h1>
        <p className="text-center">Sign in to start your session</p>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#000814] outline-none border-none p-2 rounded"
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
              className="w-full bg-[#000814] outline-none border-none p-2 rounded"
              placeholder="Enter your password"
              required
            />
          </div>
          <a href="#" className="text-gray-400 text-sm">
            Forgot password?
          </a>
          <div className="mt-4">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-white text-[#000814] p-2 rounded hover:bg-blue-700"
            >
              {loading ? "Submit.." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
