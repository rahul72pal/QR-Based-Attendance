import GlobalClassSelector from "@/components/general/GlobalClassSelector";
import { Button } from "@/components/ui/button";
import { RootState } from "@/slices/store";
import { useEffect } from "react";
import toast from "react-hot-toast";
// import { MdAssignment } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaRegCopy } from "react-icons/fa";

// type Props = {}

const ParentShare = () => {
  const classobj = useSelector((state: RootState) => state.class);

  useEffect(()=>{
    if(!classobj._id){
        toast('Select class!', {
            icon: '⚠️',
          });
    }
  },[])

  const copyParentAttendanceLink = () => {
    try {
      const baseUrl = window.location.origin;
      const attendanceLink = `${baseUrl}/${classobj._id}/${classobj.name}`;

      console.log("Copy Link =", attendanceLink);

      // Copy the link to the clipboard
      navigator.clipboard.writeText(attendanceLink).then(() => {
        toast.success("Link copied to clipboard!"); // Show success feedback
      });
    } catch (error) {
      console.error("Failed to copy link:", error);
      toast.error("Failed to copy the link. Please try again."); // Show error feedback
    }
  };
  
  return (
    <div className="flex flex-col justify-center items-center">
      <GlobalClassSelector />
      <p className="italic text-xs py-5 text-red-500">Copy the link share with your {classobj.name}</p>

      {
        classobj._id
        &&
        <Button
            onClick={copyParentAttendanceLink}
            className="shadow-sm shadow-white sm:text-sm"
          >
            <FaRegCopy />
            Copy
          </Button>
      }

    </div>
  );
};

export default ParentShare;
