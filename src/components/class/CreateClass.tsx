// import { RootState } from "@/slices/store";
import React, { useState } from "react";
// import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createClass } from "@/services/class";
import { useNavigate } from "react-router-dom";

// type Props = {};

const CreateClass = () => {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createClass(name);
      if (response !== undefined) {
        console.log(response);
        toast.success("Class added successfully!");
        router("/class");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className="p-6 sm:w-[90%] sm:m-5 bg-[#161D29] rounded shadow-md w-96">
          <h1 className="text-3xl font-semibold text-center sm:text-lg">
            Add Class
          </h1>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label htmlFor="text" className="block mb-1 sm:text-xs">
                Name
              </label>
              <input
                type="text"
                id="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#000814] sm:text-xs outline-none border-none p-2 rounded"
                placeholder="Enter Name"
                required
              />
            </div>
            <div className="mt-4">
              <button
                disabled={loading}
                type="submit"
                className="w-full sm:text-xs bg-white text-[#000814] p-2 rounded hover:bg-blue-700"
              >
                {loading ? "Submit.." : "Submit"}
              </button>
            </div>
          </form>
        </div>
    </div>
  );
};

export default CreateClass;
