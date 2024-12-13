import { Checkbox } from "../ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";


interface Student {
  student_id: string | undefined;
  name: string;
  class_name: string | undefined;
  roll_number: number;
  present: boolean | undefined;
}

interface StudentListProps {
  students: Student[];
  title: string;
}

const StudentList: React.FC<StudentListProps> = ({ students, title }) => {
  return (

      <div className="bg-[#000814] ">
        <p className="text-center sm:text-xs my-auto py-5 text-2xl ">
          {title}
        </p>
        <Table className="w-[75%] sm:text-xs sm:w-[99%] pb-4 mx-auto overflow-x-auto m-6 sm:m-2 border-2 p-3">
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-[10px]">check</TableHead> */}
              {/* Increase the width of the Name column here */}
              <TableHead className=" w-[150px] text-start text-[#FFD52A]">Name</TableHead>
              <TableHead className="text-start text-[#FFD52A]">Roll No</TableHead>
              <TableHead className="text-center text-[#FFD52A]">Present</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="h-[10px]">
            {students.map((row) => (
              <TableRow className="h-[10px] hover:bg-gray-800" key={row.student_id}>
                {/* <TableCell className="h-[10px] sm:w-[20px]">
                  <Checkbox className="sm:h-[20px] border border-white text-start sm:w-[20px]" checked={false} />
                </TableCell> */}
                {/* Increase the width of the Name cell here as well */}
                <TableCell className="w-[150px] sm:text-xs text-start">{row.name}</TableCell>
                <TableCell className="text-xs text-start">{row.roll_number}</TableCell>
                <TableCell className="h-[10px] text-center ">
                <Checkbox className={`sm:h-[20px]  bg-white border ${row.present ? "bg-white":"bg-transparent"} border-white text-start sm:w-[20px]`} checked={row.present} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  export default StudentList;
