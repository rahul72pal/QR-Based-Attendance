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

interface StudentType {
  id: string;
  name: string;
  roll_number: number;
  attendance_percentage: number;
}

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
            margin: 15px 0;
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
            <h1>GURUKUL CLASSES</h1>
        </div>
        <div class="photo-section"></div>
        <h2 class="name">{{name}}</h2>
        <div class="info-section">
            <p><strong>ROLL NO:</strong> {{roll_number}}</p>
            <p><strong>CLASS:</strong> {{class}}<sup>th</sup></p>
            <p><strong>DOB:</strong> 05-02-2003</p>
        </div>
        <div class="footer">
            For this QR system, contact at mail rahulgwl72@gmail.com.
        </div>
    </div>
    <div class="card">
        <div class="diagonal-yellow"></div>
        <div class="card-header">
            <h1>GURUKUL CLASSES</h1>
        </div>
        <div class="qr-section">
            {{img}}
        </div>
        <div class="address">
            <strong>ADD :</strong> In front of miss sill school Sikandar Kampoo, Gwalior.
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

// const html_temp2 = `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Student ID Card</title>
// </head>
// <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
//     <div class="card" style="width: 300px; height: 500px; background-color: #000814; margin: 50px auto; border-radius: 10px; overflow: hidden; color: white; text-align: center; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); position: relative;">
//         <div class="diagonal-yellow" style="position: absolute; width: 100%; height: 40%; background-color: #ffd700; clip-path: polygon(0 0, 100% 0, 100% 45%, 0 15%); z-index: 1;"></div>
//         <div class="card-header" style="padding: 15px 0; z-index: 2; position: relative;">
//             <h1 style="margin: 0; font-size: 25px; color: #000814; font-weight: bold;">GURUKUL CLASSES</h1>
//         </div>
//         <div class="photo-section" style="background-color: white; height: 120px; margin: 20px auto; width: 100px; border-radius: 5px; z-index: 2; position: relative;"></div>
//         <h2 style="margin: 40px auto;">{{name}}</h2>
//         <div class="info-section" style="text-align: center; margin: 20px 80px; z-index: 2; position: relative;">
//             <p style="margin: 15px 0; font-size: 12px; text-align: left;"><strong>ROLL NO:</strong> {{roll_number}}</p>
//             <p style="margin: 15px 0; font-size: 12px; text-align: left;"><strong>CLASS:</strong> {{class}}<sup>th</sup></p>
//             <p style="margin: 15px 0; font-size: 12px; text-align: left;"><strong>DOB:</strong> 05-02-2003</p>
//         </div>
//         <div class="footer" style="font-size: 12px; margin-top: 30px; border-top: 1px solid white; padding-top: 10px; z-index: 2; position: relative;">
//             For this QR system, contact at mail rahulgwl72@gmail.com.
//         </div>
//     </div>
//     <div class="card" style="width: 300px; height: 500px; background-color: #000814; margin: 50px auto; border-radius: 10px; overflow: hidden; color: white; text-align: center; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); position: relative;">
//         <div class="diagonal-yellow" style="position: absolute; width: 100%; height: 40%; background-color: #ffd700; clip-path: polygon(0 0, 100% 0, 100% 45%, 0 15%); z-index: 1;"></div>
//         <div class="card-header" style="padding: 15px 0; z-index: 2; position: relative;">
//             <h1 style="margin: 0; font-size: 25px; color: #000814; font-weight: bold;">GURUKUL CLASSES</h1>
//         </div>
//         <div class="qr-section" style="background-color: white; margin: 10px 20px; border-radius: 5px; z-index: 2; position: relative;">
//             {{img}}
//         </div>
//         <div class="address" style="font-size: 14px; margin: 15px 20px 5px; text-align: left; z-index: 2; position: relative;">
//             <strong>ADD :</strong> In front of miss sill school Sikandar Kampoo, Gwalior.
//         </div>
//         <div class="signature" style="text-align: right; margin-top: 5px; font-size: 14px; display: flex; gap: 5px; justify-content: center; align-items: center; z-index: 2; position: relative;">
//             <strong>Director Sign.</strong>
//             <div style="width: 150px; height: 50px; background-color: white;"></div>
//         </div>
//         <div class="footer" style="font-size: 12px; margin-top: 30px; border-top: 1px solid white; padding-top: 10px; z-index: 2; position: relative;">
//             For this QR system, contact at mail rahulgwl72@gmail.com
//         </div>
//     </div>
// </body>
// </html>
// `;

export function useColumns() {
  const navigate = useNavigate();
  const classObj = useSelector((state: RootState) => state.class);

  const generateQRCode = async (data: object) => {
    try {
      const jsonString = JSON.stringify(data); // Convert data to JSON string
      const url = await QRCode.toDataURL(jsonString, { errorCorrectionLevel: 'H', width: 256 }); // Generate QR code as data URL
      return url; // Set the QR code data URL to state
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const downloadIDCard = async(student: any) => {

    const imageUrl = await generateQRCode(student);

    const img = `<img src=${imageUrl} alt="QR Code">`
    const final_html = generateHTMLPDF(html_string, {
      name: student?.name,
      class: classObj.name,
      roll_number: student.roll_number,
      img: img
    });
    // console.log("Final Html =", final_html);

    generatePDF(final_html, student?.name);
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
        return (
          <div className="text-center">
            <Button
              onClick={() => navigate(`/student/${person.id}/${person.name}/${classObj._id}`)}
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
        };
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
                <DropdownMenuItem onClick={() => downloadIDCard(studentObj)}>
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
