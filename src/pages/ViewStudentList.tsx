import JSZip from 'jszip';
import { saveAs } from 'file-saver';
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
import { generateZIPPDF } from "@/utils/downloadPdf";

let html_string = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student ID Card</title>
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
            margin: 15px;
        }
        .card {
            width: 300px;
            height: 500px;
            background-color: #000814;
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
            margin-top: -10px;
            font-size: 25px;
            color: #000814;
            font-weight: bold;
        }
        .photo-section {
            background-color: white;
            height: 170px;
            margin: 30px auto;
            width: 150px;
            border-radius: 5px;
            z-index: 2;
            position: relative;
        }
        .info-section {
    margin: 10px auto;
    z-index: 2;
    position: relative;
    text-align: left; /* Align text to the left */
    
}

.info-section .info-row {
    display: flex; /* Use flexbox for each row */
    justify-content: center;
    align-items: center; /* Align items to the start */
    width: 100%; /* Full width */
}

.info-section p {
    margin: 1px 0;
    font-size: 14px;
    font-weight: 600;
    width: 100%;
}
.info-section p strong {
    margin-left: 80px; /* Add some space between label and value */
}
        .qr-section {
            background-color: white;
            margin: 10px 20px;
            border-radius: 5px;
            z-index: 2;
            position: relative;
            display: flex; 
            justify-content: center; 
            align-items: center; 
            height: auto; 
        }
        .qr-section img {
            width: 100%; 
            max-width: 250px; 
            height: auto; 
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
            font-size: 13px;
            margin-top: 10px;
            border-top: 1px solid white;
            padding-top: 10px;
            z-index: 2;
            position: relative;
        }
        .name{
        font-size: 22px;
        font-weight: bold;
        z-index: 5;
        }
    </style>
</head>
<body>
  <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          <div class="card" style="margin-left: 50px; margin-top: 50px;">
        <div class="diagonal-yellow"></div>
        <div class="card-header">
            <h1>{{institute_name}}</h1>
        </div>
        <div class="photo-section"></div>
        <h2 class="name">{{name}}</h2>
        <div class="info-section">
    <div class="info-row">
        <p><strong>ROLL NO:</strong> {{roll_number}}</p>
    </div>
    <div class="info-row">
        <p><strong>Father:</strong> {{father_name}}</p>
    </div>
    <div class="info-row">
        <p><strong>CLASS:</strong> {{class}}</p>
    </div>
    <div class="info-row">
        <p><strong>DOB:</strong> {{dob}}</p>
    </div>
</div>
        <div class="footer">
            For this QR system, go to 99attendance.netlify.app
        </div>
    </div>
    <div class="card" style="margin-top: 50px;">
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
  </div>
</body>
</html>`


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
  const [progress, setProgress] = useState(0);
  const classObj = useSelector((state: RootState) => state.class);
  const [downaloding, setDownloading] = useState(false);
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
    const toastId = toast.loading(`Downloading...`);
    setDownloading(true);
  
    try {
      const zip = new JSZip();
      const pdfPromises = students.map(async (student: any) => {
        const studentAttendanceLink = `${baseUrl}/${
          student.id
        }/${encodeURIComponent(student.name)}/${student.roll_number}/${
          classObj._id
        }`;
        const imageUrl = await generateQRCode(studentAttendanceLink);
  
        const img = `<img src=${imageUrl} alt="QR Code">`;
        const htmlContent = generateHTMLPDF(html_string, {
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
  
        const pdf = await generateZIPPDF(htmlContent);
        setProgress((prev)=> prev+1);
        return { name: student.name, pdf };
      });
  
      const pdfFiles = await Promise.all(pdfPromises);
  
      pdfFiles.forEach(({ name, pdf }) => {
        zip.file(`${name}.pdf`, pdf.output('blob'), { binary: true });
      });
  
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'id_cards.zip');
  
      toast.success("All ID cards downloaded successfully");
    } catch (error) {
      console.error("Error generating ID cards:", error);
      toast.error("Failed to download ID cards");
    } finally {
      toast.dismiss(toastId);
    }
    setDownloading(false);
  };
  
  const DownlaodAllCardModal = ()=>{
    return(
      <div className="bg-gray-800 p-6 w-[80%] mx-auto flex flex-col gap-10 rounded-md text-center ">
      {downaloding && <p>Progress {(progress/students?.length)*100}%</p>}
      <p className="text-xl">Download Card In ZIP File</p>
      <div className="flex flex-col gap-5">
        <Button disabled={downaloding} onClick={()=>downloadAllIDCards(students)}>Download</Button>
        <Button onClick={()=>setIsDownloadModal(false)}>cancel</Button>
      </div>
    </div>
    )
  }

  return (
    <div className="w-[100vw]">
      <Button onClick={()=>setIsDownloadModal(true)} className="p-4 mt-6 ml-6 sm:text-xs">
        Download All ID Cards ZIP File
      </Button>
      <GlobalClassSelector />
      <div className="mt-8">
        <p className="text-center sm:text-lg">{classObj.name} Student Attendance List</p>
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
