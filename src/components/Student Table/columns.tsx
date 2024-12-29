import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenuItem, DropdownMenuLabel } from "../ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { generateHTMLPDF } from "@/utils/generateHTML";
import { useSelector } from "react-redux";
import { RootState } from "@/slices/store";
import QRCode from "qrcode";
import { generatePDF } from "@/utils/downloadPdf";
import toast from "react-hot-toast";
import { format, isValid } from "date-fns";

interface StudentType {
  id: string;
  name: string;
  roll_number: number;
  attendance_percentage: number;
  father_name: string,
  dob: Date
}

let html_string = `
<!DOCTYPE html>
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
        .card {
            width: 300px;
            height: 500px;
            background-color: #000814;
            margin: 50px auto;
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
            <p><strong>CLASS:</strong> {{class}}<sup>th</sup></p>
            <p><strong>DOB:</strong> {{dob}}</p>
        </div>
        <div class="footer">
            For this QR system, contact at mail rahulgwl72@gmail.com.
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
            For this QR system, contact at mail rahulgwl72@gmail.com
        </div>
    </div>
</body>
</html>
`;

export function useColumns() {
  const navigate = useNavigate();
  const teacher = useSelector((state: RootState)=> state.teacher)
  const classObj = useSelector((state: RootState) => state.class);

  const generateQRCode = async (studentUrl: string) => {
    try {
      // const jsonString = JSON.stringify(data); // Convert data to JSON string
      const url = await QRCode.toDataURL(studentUrl, { errorCorrectionLevel: 'H', width: 256 }); // Generate QR code as data URL
      return url; // Set the QR code data URL to state
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const downloadIDCard = async(student: any, studentAttendanceLink: string) => {
    const toasId = toast.loading("Downloading ID card..");
    console.log("studentAttendanceLink =", studentAttendanceLink);
    const imageUrl = await generateQRCode(studentAttendanceLink);

    const img = `<img src=${imageUrl} alt="QR Code">`
    const final_html = generateHTMLPDF(html_string, {
      name: student?.name,
      class: classObj.name,
      roll_number: student.roll_number,
      img: img,
      institute_name: teacher.institute_name.toUpperCase(),
      institute_address: teacher.institute_address,
      father_name: student.father_name,
      dob: student.dob && isValid(new Date(student.dob)) ? format(new Date(student.dob), "dd-MM-yyyy") : "N/A"
    });
    // console.log("Final Html =", final_html);

    generatePDF(final_html, student?.name);
    toast.dismiss(toasId);
  };

  const columns: ColumnDef<StudentType>[] = [
    {
      header: ({ column }) => (
        <Button
          className="sm:text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Roll No
          <ArrowUpDown className="ml-2 sm:text-xs h-4 w-4" />
        </Button>
      ),
      accessorKey: "roll_number",
      cell: ({ row }) => {
        const roll_no = row.getValue<number>("roll_number");
        return <span className="mx-9">{roll_no}</span>;
      },
    },
    {
      header: ({ column }) => (
        <Button
          className="sm:text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      accessorKey: "name",
      cell: ({ row }) => {
        const name = row.original.name;
        return (
          <div className="text-center">
              {name}
          </div>
        );
      },
    },
    {
      header: ({ column }) => (
        <div className="text-center">
          <Button
          className="sm:text-xs mx-auto text-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          DOB
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        </div>
      ),
      accessorKey: "dob",
      cell: ({ row }) => {
        const dob = row.original.dob; // Get the date of birth
      
        // Check if dob is a valid date
        const formattedDob = dob && isValid(new Date(dob)) ? format(new Date(dob), "dd-MM-yyyy") : "N/A"; // Fallback to "N/A" if invalid
      
        return (
          <div className="text-center">{formattedDob}</div>
        );
      }
    },
    {
      header: ({ column }) => (
        <Button
          className="sm:text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Father Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      accessorKey: "father_name",
      cell: ({ row }) => {
        const father_name = row.original.father_name;
        return (
          <div className="text-center">
              {father_name}
          </div>
        );
      },
    },
    {
      header: ({ column }) => (
        <Button
          className="sm:text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Attendance %
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      accessorKey: "attendance_percentage",
      cell: ({ row }) => {
        const attendance = row.getValue<number>("attendance_percentage");
        const person = row.original;
        // console.log("Person =", person);
        //  path="/:id/:name/:roll_number/:classId"
        return (
          <div className="text-center">
            <Button
              onClick={() => navigate(`/${person.id}/${person.name}/${person.roll_number}/${classObj._id}`)}
              className="bg-white text-black hover:text-white sm:text-xs px-2 h-[35px] mx-auto "
            >
              {attendance}%
            </Button>
          </div>
        );
      },
    },
    {
      header: () => {
        return (
          <div className=" w-[100px] text-center">
            <span>Action</span>
          </div>
        );
      },
      id: "actions",
      cell: ({ row }) => {
        const person = row.original;
        const studentObj = {
          name: person.name,
          roll_number: person.roll_number,
          class_id: classObj._id,
          father_name: person.father_name,
          dob: person.dob
        };

        const baseUrl = window.location.origin;
        const studentAttendanceLink = `${baseUrl}/${person.id}/${encodeURIComponent(person.name)}/${person.roll_number}/${classObj._id}`;
        // console.log("Person Actions =", studentObj);
        return (
          <div className="text-center w-[100px]">
            <DropdownMenu>
              <DropdownMenuTrigger className="mx-auto" asChild>
                <Button variant="ghost" className="w-8 h-8 p-0 border">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#000814] shadow-white shadow-md p-3 border rounded-md">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => downloadIDCard(studentObj, studentAttendanceLink)}>
                  Download ID card
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return columns;
}
