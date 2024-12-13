import { SignupTeacher } from "@/services/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signup: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        name,
        email,
        password,
      };
      const response = await SignupTeacher(data);
      if (response) {
        console.log(response);
        Cookies.set("token", response.token, { expires: 7 });
        Cookies.set("teacher", JSON.stringify(response.teacher), { expires: 7 })
        router("/class");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    console.log("Signing up with:", { name, email, password });
  };

  return (
    <div className="flex items-center justify-center h-[80vh] bg-[#000814]">
      <div className="p-6 bg-[#161D29] rounded shadow-md w-96">
        <h1 className="text-3xl font-semibold text-center">Sign Up</h1>
        <p className="text-center">Create your account</p>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#000814] outline-none border-none p-2 rounded"
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
          <div className="mt-4">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-white text-black p-2 rounded "
            >
              {loading ? "Logging.." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
