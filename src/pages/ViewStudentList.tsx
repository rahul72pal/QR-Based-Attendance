// import { Button } from "@/components/ui/button";
// import {
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
//   Table,
// } from "@/components/ui/table";
import { getAllStudents } from "@/services/student";
import { RootState } from "@/slices/store";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { format, isValid } from "date-fns";
// import { useNavigate } from "react-router-dom";
// import { IoArrowBackSharp } from "react-icons/io5";
import { StudentDataTable } from "@/components/Student Table/data-table";
import { useColumns } from "@/components/Student Table/columns";
import GlobalClassSelector from "@/components/general/GlobalClassSelector";
import toast from "react-hot-toast";
import Modal from "@/components/modal/modal";
import EditStudent from "@/components/Student/EditStudent";
import { generateHTMLPDF, generateQRCode } from "@/utils/generateHTML";
// import { generatePDFAllCards } from "@/utils/downloadPdf";
import { Button } from "@/components/ui/button";

let html_string = `<div class="card-container">
    <div class="card">
        <div class="diagonal-yellow"></div>
        <div class="card-header">
            <h1>{{institute_name}}</h1>
        </div>
        <div class="photo-section"></div>
        <h2 class="name">{{name}}</h2>
        <div class="info-section">
            <p><strong>ROLL NO:</strong> {{roll_number}}</p>
            <p><strong>Father:</strong> {{father_name}}</p>
            <p><strong>CLASS:</strong> {{class}}</p>
            <p><strong>DOB:</strong> {{dob}}</p>
        </div>
        <div class="footer">
            For this QR system, go to 99attendance.netlify.app
        </div>
    </div>
    <div class="card">
        <div class="diagonal-yellow"></div>
        <div class="card-header">
            <h1>{{institute_name}}</h1>
        </div>
        <div class="qr-section">
            {{img}}
        </div>
        <div class="address">
            <strong>ADD :</strong> {{institute_address}}.
        </div>
        <div class="signature">
            <strong>Director Sign.</strong>
            <div></div>
        </div>
        <div class="footer">
            For this QR system, go to 99attendance.netlify.app
        </div>
    </div>
  </div>`


interface StudentType {
  id: string;
  name: string;
  roll_number: number;
  attendance_percentage: number;
  father_name: string;
  dob: string;
}

const ViewStudentList = () => {
  const [selectedStudent, setSelectedStudent] = useState<StudentType | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloadModal, setIsDownloadModal] = useState(false);

  const columns = useColumns(setSelectedStudent, setIsModalOpen);
  const [students, setStudents] = useState<any>([]);
  const classObj = useSelector((state: RootState) => state.class);
    // const teacher = useSelector((state: RootState) => state.teacher);
    const baseUrl = window.location.origin;
  const teacher = useSelector((state: RootState) => state.teacher);
  // const router = useNavigate();
  const classobj = useSelector((state: RootState) => state.class);

  // Memoized fetchStudents function
  const fetchStudents = useCallback(async () => {
    try {
      const result = await getAllStudents(classobj._id);
      if (result) {
        setStudents(result); // Update students state
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }, [classobj._id]); // Dependency ensures function is recreated when classobj._id changes

  // Call fetchStudents whenever classobj._id changes
  useEffect(() => {
    if (classobj._id) {
      fetchStudents();
    } else {
      toast("Select class!", {
        icon: "⚠️",
      });
    }
  }, [fetchStudents]); // fetchStudents already depends on classobj._id

  console.log("11111122222222=", selectedStudent);

  const downloadAllIDCards = async (students: any) => {
    const toastId = toast.loading("Downloading all ID cards...");
  
    try {
      const allCardsHTML = await Promise.all(
        students.map(async (student: any) => {
          const studentAttendanceLink = `${baseUrl}/${
            student.id
          }/${encodeURIComponent(student.name)}/${student.roll_number}/${
            classObj._id
          }`;
          const imageUrl = await generateQRCode(studentAttendanceLink);
  
          const img = `<img src=${imageUrl} alt="QR Code">`;
          return generateHTMLPDF(html_string, {
            name: student?.name,
            class: classObj.name,
            roll_number: student.roll_number,
            img: img,
            institute_name: teacher.institute_name.toUpperCase(),
            institute_address: teacher.institute_address,
            father_name: student.father_name,
            dob:
              student.dob && isValid(new Date(student.dob))
                ? format(new Date(student.dob), "dd-MM-yyyy")
                : "N/A",
          });
        })
      );
  
      const finalHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Student ID Cards</title>
            <style>
                  body {
                      font-family: Arial, sans-serif;
                      margin: 0;
                      padding: 0;
                      background-color: #f5f5f5;
                  }
                  .card-container {
                      display: flex; 
                      margin: 0; 
                      gap: 5px;
                      justify-content: center;
                  }
                  .card {
                      width: 300px;
                      height: 500px;
                      background-color: #000814;
                      margin: 0; /* Remove margin between cards */
                      border-radius: 10px;
                      overflow: hidden;
                      color: white;
                      text-align: center;
                      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                      position: relative;
                  }
                  .diagonal-yellow {
                      position: absolute;
                      top: 20px;
                      left: 20px;
                      width: 100%;
                      height: 100%;
                      background-color: #ffd700;
                      z-index: 1;
                      transform: rotate(55deg);
                      transform-origin: top right;
             
                  }
                  .card-header {
                      padding: 15px 0;
                      z-index: 2;
                      position: relative;
                  }
                  .card-header h1 {
                      margin: 0;
                      font-size: 25px;
                      color: #000814;
                      font-weight: bold;
                  }
                  .photo-section {
                      background-color: white;
                      height: 120px;
                      margin: 20px auto;
                      width: 100px;
                      border-radius: 5px;
                      z-index: 2;
                      position: relative;
                  }
                  .info-section {
                      text-align: center;
                      margin: 20px 80px;
                      z-index: 2;
                      position: relative;
                  }
                  .info-section p {
                      margin: 10px 0;
                      font-size: 12px;
                      text-align: left;
                  }
                  .qr-section {
                      background-color: white;
                      margin: 10px 20px;
                      border-radius: 5px;
                      z-index: 2;
                      position: relative;
                      display: flex; /* Use flexbox to center the image */
                      justify-content: center; /* Center horizontally */
                      align-items: center; /* Center vertically if needed */
                      height: auto; /* Adjust height as needed */
                  }
                  
                  .qr-section img {
                      width: 100%; /* Full width of the parent */
                      max-width: 250px; /* Maximum width */
                      height: auto; /* Maintain aspect ratio */
                  }
                  .address {
                      font-size: 14px;
                      margin: 15px 20px 5px;
                      text-align: left;
                      z-index: 2;
                      position: relative;
                  }
                  .signature {
                      text-align: right;
                      margin-top: 5px;
                      font-size: 14px;
                      display: flex;
                      gap: 5px;
                      justify-content: center;
                      align-items: center;
                      z-index: 2;
                      position: relative;
                  }
                  .signature div {
                      width: 150px;
                      height: 30px;
                      background-color: white;
                  }
                  .footer {
                      font-size: 12px;
                      margin-top: 20px;
                      border-top: 1px solid white;
                      padding-top: 10px;
                      z-index: 2;
                      position: relative;
                  }
                  .name{
                  font-size: 30px;
                  font-weight: bold;
                  z-index: 5;
                  }
              </style>
        </head>
        <body>
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            ${allCardsHTML.join("")}
          </div>
        </body>
        </html>
      `;
  
      // Convert HTML string to Blob
      const blob = new Blob([finalHTML], { type: "text/html" });
      const url = URL.createObjectURL(blob);
  
      // Create a temporary anchor element to trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = `${classObj.name} ID Cards.html`;
      document.body.appendChild(link);
      link.click();
  
      // Clean up the temporary URL and element
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
  
      toast.success("ID cards downloaded successfully!");
      toast.dismiss(toastId);
    } catch (error) {
      console.error("Error generating ID cards:", error);
      toast.error("Failed to download ID cards");
      toast.dismiss(toastId);
    }
  };
  
  const DownlaodAllCardModal = ()=>{
    return(
      <div className="bg-gray-800 p-6 w-[80%] mx-auto flex flex-col gap-10 rounded-md text-center ">
      <p className="text-xl">Download HTML File Converte PDF Formate</p>
      <div className="flex flex-col gap-5">
        <Button onClick={()=>downloadAllIDCards(students)}>Download</Button>
        <Button onClick={()=>setIsDownloadModal(false)}>cancel</Button>
      </div>
    </div>
    )
  }

  return (
    <div className="w-[100vw]">
      <Button onClick={()=>setIsDownloadModal(true)} className="p-4 mt-6 ml-6 sm:text-xs">
        Download All ID Cards
      </Button>
      <GlobalClassSelector />
      <div className="mt-8">
        <p className="text-center sm:text-lg">Student Attendance List</p>
        <p className="text-center text-xs sm:text-xs">Class 10th Science</p>
        {classobj._id && students && (
          <div className="p-2 w-[100vw] overflow-x-auto">
            <StudentDataTable data={students} columns={columns} />
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <EditStudent
          id={selectedStudent?.id ? selectedStudent.id: ""}
          name={selectedStudent?.name ? selectedStudent.name : ""}
          father_name={selectedStudent?.father_name? selectedStudent.father_name: ""}
          dob={selectedStudent?.dob? selectedStudent.dob : ""}
          onClose={() => setIsModalOpen(false)}
          fetchStudentList={()=>fetchStudents()}
        />
      </Modal>

      <Modal isOpen={isDownloadModal} onClose={() => setIsDownloadModal(false)}>
        <DownlaodAllCardModal/>
      </Modal>

    </div>
  );
};

export default ViewStudentList;
