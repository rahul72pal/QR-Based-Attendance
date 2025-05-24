import { useEffect, useRef, useState, useCallback } from "react";
import QrScanner from "qr-scanner";
import toast from "react-hot-toast";
import { saveAttdance } from "@/services/attendance";
const sampleQrImage = "./sampleQR.png";

type Props = {
  onClose: () => void;
  date: string;
  class_id: string;
};

interface QRCodeResult {
  name: string;
  roll_number: number;
  class_id: string;
}

const NewQrScanner = (props: Props) => {
  const scanner = useRef<QrScanner | null>(null);
  const videoEl = useRef<HTMLVideoElement | null>(null);
  const qrBoxEl = useRef<HTMLDivElement | null>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const [scannedResult, setScannedResult] = useState<QRCodeResult[]>([]);
  const [startScan, setStartScan] = useState<boolean>(false);
  const scannedRollNumbers = useRef<Set<number>>(new Set());
  const [isUserInteracted, setIsUserInteracted] = useState(false);

  // Function to play the beep
  function playBeep() {
    const audio = new Audio(
      "https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3"
    );
    audio.play().catch((error) => {
      console.error("Audio playback failed:", error);
    });
  }

  const handleUserInteraction = () => {
    // This function is invoked by any user interaction like a button click
    setStartScan(!startScan);
    setIsUserInteracted(true);
  };
  // const class_id = "67360c3c4d7e24fe5b08fe9b";

  //   const onScanSuccess = useCallback((data: any) => {
  //     let newResult: QRCodeResult;
  //     console.log("newResult =", data);

  //     try {
  //       newResult = JSON.parse(data?.data) as QRCodeResult;
  //       console.log("newResult =", newResult, data);

  //       if (!newResult.name || !newResult.roll_number || !newResult.class_id) {
  //         toast.error("Invalid QR format");
  //         return;
  //       }

  //       if(newResult.class_id !== props.class_id){
  //         toast.error("Class Not Match");
  //         return;
  //       }
  //     } catch (error) {
  //       console.error("Parsing error:", error);
  //       toast.error("Invalid QR code format. Please scan a valid QR code.");
  //       return;
  //     }

  //     const newRollNo:number = newResult.roll_number;

  //     if (isUserInteracted && !scannedRollNumbers.current.has(newRollNo)) {
  //       console.log("New QR Code scanned:", newResult);
  //       scannedRollNumbers.current.add(newRollNo);
  //       setScannedResult((prev) => [...prev, newResult]);

  //       // Play a short beep after user interaction
  //       playBeep();

  //       toast.success(`QR Code Scanned! ${newResult.name}`);
  //     }
  //   }, [isUserInteracted]);

  const onScanSuccess = useCallback(
    (data: any) => {
      console.log("Scanned Data =", data);

      try {
        // Split the URL data by "/" and extract the components
        const parts = data?.data.split("/");
        if (parts.length < 5) {
          toast.error("Invalid QR code format");
        }

        const student_id = parts[3]; // Extract student_id
        const name = decodeURIComponent(parts[4]); // Extract name and decode URI-encoded values
        const roll_number = parseInt(parts[5], 10); // Extract roll_number as a number
        const class_id = parts[6]; // Extract class_id

        // Validate the extracted data
        if (!name || isNaN(roll_number) || !class_id || !student_id) {
          toast.error("Incomplete data in QR code");
        }

        const newResult: QRCodeResult = { name, roll_number, class_id };

        // Check for matching class ID
        if (newResult.class_id !== props.class_id) {
          toast.error("Class does not match");
          return;
        }

        const newRollNo = newResult.roll_number;

        // Ensure no duplicate roll numbers and that user interaction has occurred
        if (isUserInteracted && !scannedRollNumbers.current.has(newRollNo)) {
          console.log("New QR Code scanned:", newResult);
          scannedRollNumbers.current.add(newRollNo);
          setScannedResult((prev) => [...prev, newResult]);

          // Play a short beep after user interaction
          playBeep();

          toast.success(`QR Code Scanned! ${newResult.name}`);
        }
      } catch (error) {
        console.error("Parsing error:", error);
        toast.error("Invalid QR code format. Please scan a valid QR code.");
        return;
      }
    },
    [isUserInteracted, props.class_id]
  );

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

  const handleSaveAttendance = async () => {
    try {
      const attenanceData = {
        class_id: props.class_id,
        date: props.date,
        attendance_data: scannedResult,
      };
      const result = await saveAttdance(attenanceData);
      console.log(result);
      if (result) {
        // attendance();
      }
    } catch (error) {
      console.log(error);
    } finally {
      props.onClose();
    }
  };

  console.log("scannedResult =", scannedResult, props.class_id, props.date);

  return (
    <>
      <div className="relative sm:w-[100vw] flex flex-col items-center lg:w-[100%] mx-auto justify-start h-screen bg-gray-600 bg-opacity-50">
        {/* Video layer (absolute only when scanning) */}
        {startScan && (
          <video
            ref={videoEl}
            className="sm:w-[100vw] w-[50vw] h-[70vh] sm:h-[100vw] object-cover rounded-lg shadow-lg border-dashed border-red-600"
          />
        )}

        {/* QR Box: Always in flow */}
        <div
          ref={qrBoxEl}
          className={`w-64 h-64 flex flex-col gap-4 border-4 border-dashed border-yellow-500 mt-10 ${
            startScan ? "absolute top-10" : ""
          }`}
        >
          {!startScan && !videoEl.current && (
            <img
              src={sampleQrImage}
              alt="QR Frame"
              className="w-full h-full object-cover opacity-70"
              width={356}
              height={356}
            />
          )}
        </div>

        {/* Scanned Results */}
        <div className="mt-10 text-center">
          <h3 className="text-xl">
            Number of Scanned Results: {scannedResult.length}
          </h3>

          <button
            className="px-8 mt-4 py-2 text-[23px] bg-gray-700 text-white rounded-md"
            onClick={handleUserInteraction}
          >
            {startScan ? "Stop Scanning" : "Start Scanning"}
          </button>
        </div>

        {/* Submit Button */}
        <div className="sm:mt-16 w-full text-center flex flex-col mt-10 lg:mt-12">
          <button
            className="text-black bg-[#FFD52A] py-2 rounded-xl font-semibold text-2xl w-[75%] mx-auto px-10"
            onClick={() => handleSaveAttendance()}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default NewQrScanner;
