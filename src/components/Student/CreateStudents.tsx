import { createStudents } from "@/services/student";
import { RootState } from "@/slices/store";
import { useState } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import QRCode from "qrcode"; // Import the QRCode library

const CreateStudents = () => {
  const [name, setName] = useState<string>("");
  const classobj = useSelector((state: RootState) => state.class);
  const [loading, setLoading] = useState<boolean>(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null); // State to hold the QR code data URL
//   const router = useNavigate();

  const generateQRCode = async (data: object) => {
    try {
      const jsonString = JSON.stringify(data); // Convert data to JSON string
      const url = await QRCode.toDataURL(jsonString, { errorCorrectionLevel: 'H', width: 256 }); // Generate QR code as data URL
      setQrCodeDataUrl(url); // Set the QR code data URL to state
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createStudents(classobj._id, name);
      if (response) {
        console.log(response);
        // Generate QR code with the student data
        generateQRCode(response.data);
        // router("/class");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  console.log(qrCodeDataUrl);

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-[#000814]">
      <div className="p-6 sm:mt-[150px] sm:w-[90%] sm:m-5 bg-[#161D29] rounded shadow-md w-96">
        <h1 className="text-3xl font-semibold text-center sm:text-lg">Add Student</h1>
        <h1 className="text-lg py-4 text-center sm:text-xl">{classobj?.name}</h1>
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

      {/* Showing QR code */}
      <div className="m-4 flex items-center justify-center">
        {qrCodeDataUrl && (
          <img src={qrCodeDataUrl} alt="QR Code" className="mt-4 w-[400px] mx-auto" />
        )}
      </div>
    </div>
  );
};

export default CreateStudents;