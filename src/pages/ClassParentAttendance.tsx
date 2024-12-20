import { useEffect, useRef, useState, useCallback } from "react";
import QrScanner from "qr-scanner";
import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import { RootState } from "@/slices/store";
import { parentAttendance } from "@/services/student";
import { useNavigate, useParams } from "react-router-dom";
const sampleQrImage = '../../public/sampleQR.png'

interface QRCodeResult {
  name: string;
  roll_number: number;
  class_id: string;
}


const ClassParentAttendance = () => {
  const scanner = useRef<QrScanner | null>(null);
  const videoEl = useRef<HTMLVideoElement | null>(null);
  const qrBoxEl = useRef<HTMLDivElement | null>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
//   const [scannedResult, setScannedResult] = useState<QRCodeResult[]>([]);
  const [startScan, setStartScan] = useState<boolean>(false);
  const scannedRollNumbers = useRef<Set<number>>(new Set());
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const { classId: classId, className: className } = useParams();
  const router = useNavigate();

  const handleUserInteraction = () => {
    // This function is invoked by any user interaction like a button click
    setStartScan(!startScan)
    setIsUserInteracted(true);
  };
  
  const fetchStudentAttendance = async(name: string, roll_no: number) =>{
    try {
       const toastId =  toast.loading("Wait..");
        const studentData = await parentAttendance(classId? classId: "", name, roll_no);
        console.log("Parent response", studentData);
        if(studentData){
            router(`/student/${studentData._id}/${studentData.name}/${classId}`)
        }
        toast.dismiss(toastId);
    } catch (error) {
        console.log(error);
    }
  }

  const onScanSuccess = useCallback((data: any) => {
    let newResult: QRCodeResult;
    // console.log("newResult =", data);

    try {
      newResult = JSON.parse(data?.data) as QRCodeResult;
      console.log("newResult =", newResult, data);

      if (!newResult.name || !newResult.roll_number || !newResult.class_id) {
        toast.error("Invalid QR format");
        return;
      }

      console.log(newResult.class_id , classId)
      if(newResult.class_id !== classId){
        toast.error("Class Not Match");
        return;
      }
    } catch (error) {
      console.error("Parsing error:", error);
      toast.error("Invalid QR code format. Please scan a valid QR code.");
      return;
    }

    const newRollNo:number = newResult.roll_number;

    if (isUserInteracted && !scannedRollNumbers.current.has(newRollNo)) {
      console.log("New QR Code scanned:", newResult);
      scannedRollNumbers.current.add(newRollNo);
    //   setScannedResult((prev) => [...prev, newResult]);
      fetchStudentAttendance(newResult.name, newResult.roll_number);
      toast.success(`QR Code Scanned! ${newResult.name}`);
      setStartScan(false);
    }
  }, [isUserInteracted]);

  const onScanFail = (err: Error) => {
    console.log("Scan failed", err);
  };

  useEffect(() => {
    if (startScan && videoEl.current) {
      scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl.current || undefined,
      } as any);
      

      scanner.current
        .start()
        .then(() => setQrOn(true))
        .catch((err) => {
          setQrOn(false);
          console.error(err);
        });

      return () => {
        scanner.current?.stop();
      };
    } else {
      scanner.current?.stop();
    }
  }, [startScan, onScanSuccess]);

  useEffect(() => {
    if (!qrOn) {
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and reload."
      );
    }
  }, [qrOn]);

  console.log("classId =", classId);

  return (
    <div>
        <div className="relative sm:w-[100vw] flex flex-col items-center lg:w-[100%] mx-auto justify-center h-screen bg-gray-600 bg-opacity-50">
        {startScan && (
          <video
            ref={videoEl}
            className="sm:w-[100vw] w-[50vw] h-[70vh] sm:h-[100vw] absolute top-10 sm:max-w-[100vw] sm:max-h-[70vh] object-cover rounded-lg shadow-lg border-dashed border-red-600"
          />
        )}

        <div
          ref={qrBoxEl}
          className="w-64 h-64 absolute text-center flex flex-col gap-4 top-10 border-4  border-dashed border-yellow-500"
        >
          {!videoEl.current && !startScan && (
            <img
              src={sampleQrImage}
              alt="QR Frame"
              className="w-full h-full object-cover opacity-70 "
              width={356}
              height={356}
            />
          )}
        </div>

        <div className="mt-[0px] text-center">
          <h3>Student of {className}</h3>

          <button
            className="px-8 mt-4 py-2 text-[23px] bg-gray-700 text-white rounded-md"
            onClick={handleUserInteraction}
          >
            {startScan ? "Stop Scanning" : "Start Scanning"}
          </button>
        </div>

        {/* <button onClick={onClose}></button> */}

        {/* <div className="sm:mt-16 w-full lg:absolute lg:bottom-0 pb-8 text-center flex flex-col">
          <button
            className="text-black bg-[#FFD52A] py-2 rounded-xl font-semibold text-2xl w-[75%] mx-auto px-10"
            onClick={() => handleSaveAttendance()}
          >
            Submit
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default ClassParentAttendance