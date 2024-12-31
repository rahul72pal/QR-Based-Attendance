import { updateStudent } from "@/services/student";
import { RootState } from "@/slices/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
// import { useNavigate } from "react-router-dom";
// import QRCode from "qrcode"; // Import the QRCode library
// import GlobalClassSelector from "../general/GlobalClassSelector";
import toast from "react-hot-toast";
import DatePicker from "../general/DatePicker";

type Props = {
  id: string ;
  name: string;
  father_name: string;
  dob: string;
  onClose: ()=>void;
  fetchStudentList: ()=>void;
};

const EditStudent = (props: Props) => {
  const [name, setName] = useState<string>(props.name);
  const [fatherName, setFatherName] = useState<string>(props.father_name);
  // const [dob, setDob] = useState<string>(""); // Use a string to bind to the input field
  const classobj = useSelector((state: RootState) => state.class);
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(new Date(props.dob));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(props.id,
        name,
        fatherName,
        date);
      const response = await updateStudent(
        props.id,
        name,
        fatherName,
        date
      );
      if (response) {
        console.log(response);
        props.fetchStudentList();
        props.onClose();
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!classobj._id) {
      toast("Select class!", {
        icon: "⚠️",
      });
    }
  }, [classobj]);

  const isEdit = ()=>{
    return(
      name === props.name && fatherName === props.father_name && date?.toString()===new Date(props.dob).toString()
    )
  }

  // console.log(date?.toString()===new Date(props.dob).toString());
  console.log(isEdit(),name === props.name, fatherName === props.father_name,  date?.toString()===new Date(props.dob).toString());
  return (
    <div className="">
      {classobj._id && (
        <div className="p-6 sm:w-[90%] mx-auto bg-[#161D29] rounded shadow-md w-96">
          <h1 className="text-3xl font-semibold text-center sm:text-lg">
            Update Student
          </h1>
          <h1 className="text-lg py-4 text-center sm:text-xl">
            {classobj?.name}
          </h1>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1 sm:text-xs">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#000814] sm:text-xs outline-none border-none p-2 rounded"
                placeholder="Enter Name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fatherName" className="block mb-1 sm:text-xs">
                Father's Name
              </label>
              <input
                type="text"
                id="fatherName"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                className="w-full bg-[#000814] sm:text-xs outline-none border-none p-2 rounded"
                placeholder="Enter Father's Name"
                required
              />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="dob" className="block mb-1 sm:text-xs">
                Date of Birth
              </label>
              {date ? (
                <div className="flex justify-between">
                  <span className=" text-sm ">{format(date, "PPP")}</span>
                  <span
                    onClick={() => setDate(undefined)}
                    className="text-yellow-400 "
                  >
                    Reset
                  </span>
                </div>
              ) : (
                <DatePicker date={date} setDate={setDate} />
              )}
            </div>
            <div className="mt-4">
              <button
                disabled={loading ? loading : isEdit()}
                type="submit"
                className={`w-full sm:text-xs text-[#000814] p-2 rounded ${isEdit() ? "bg-gray-400" : "bg-white" }`}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditStudent;
