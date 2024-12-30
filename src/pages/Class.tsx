import { Button } from "@/components/ui/button";
import { deleteClassById, getAllClass, updateClassName } from "@/services/class";
// import { RootState } from "@/slices/store";

import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";

// import { IoArrowBackSharp } from "react-icons/io5";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
// import { setClasses } from "@/slices/classReducer";
import { RootState } from "@/slices/store";
import { setClassId, setClassName } from "@/slices/classReducer";
import Modal from "@/components/modal/modal";
interface Class {
  _id: string | null;
  name: string | null;
}

interface ClassNameUpdateFormProps {
  className: string;
  classId: string;
  onClose: () => void;
  fetchClass: () => void; // Assuming this is a function to fetch updated class data
}

const ClassNameUpdateForm: React.FC<ClassNameUpdateFormProps> = ({ className, classId, onClose, fetchClass }) => {
  const [newClassName, setNewClassName] = useState<string>(className);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const handleUpdateClass = async () => {
    setLoading(true); // Set loading to true when starting the update
    try {
      const response = await updateClassName(classId, newClassName);
      if (response) {
        onClose();
        fetchClass();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Reset loading state after the operation
    }
  };

  return (
    <div className="bg-gray-800 p-6 w-[80%] mx-auto flex flex-col gap-10 rounded-md text-center">
      <p className="text-xl">
        Are You Sure You Want to Update{" "}
        <span className="text-[#FFD52A]">{newClassName}</span>?
      </p>
      <form action="">
        <input
          type="text"
          id="className"
          value={newClassName} // Bind the input value to state
          onChange={(e) => setNewClassName(e.target.value)} // Update the state on change
          className="w-full bg-[#000814] outline-none border-none p-2 rounded"
          placeholder="Enter the new class name"
          required
        />
      </form>
      <div className="flex flex-row-reverse justify-evenly gap-5">
        <button
          onClick={handleUpdateClass}
          className={`bg-white text-black hover:text-white font-bold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading} // Disable button when loading
        >
          {loading ? 'Updating...' : 'Update'} {/* Show loading text */}
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

const Class = () => {
  const [classList, setClassList] = useState<Class[]>();
  const classObj = useSelector((state: RootState) => state.class);
  const [isModalOpen, setOpenModal] = useState<boolean>(false);
  const [deletedId, setDeleteId] = useState<string>("");
  const [deletedname, setDeletename] = useState<string>("");
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [updateClass, setUpdateClass] = useState<Class>();
  // const classObj = useSelector((state: RootState) => state.class);
  // const router = useNavigate();
  const dispatch = useDispatch();

  const fetchAllClasses = async () => {
    try {
      const result = await getAllClass(dispatch, classObj);
      console.log("All classes = ", result?.classes);
      if (result) {
        setClassList(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllClasses();
  }, []);

  const deleteClass = async () => {
    try {
      const deleteResponse = await deleteClassById(deletedId);
      if (deleteResponse) {
        if (deletedId === classObj._id) {
          setClassId(null), setClassName(null);
        }
        fetchAllClasses();
        setOpenModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteModalOpen = async (
    id: string | null,
    name: string | null
  ) => {
    setOpenModal(true);
    id && setDeleteId(id);
    name && setDeletename(name);
  };

  const handleUpadteModalOpen = async (
    id: string | null,
    name: string | null
  ) => {
    setUpdateModalOpen(true);
    id && name && setUpdateClass({ _id: id, name: name });
  };

  const ClassModalForm = () => {
    return (
      <div className="bg-gray-800 p-6 w-[80%] mx-auto flex flex-col gap-10 rounded-md text-center ">
        <p className="text-xl">
          Are You Want to Delete{" "}
          <span className="text-[#FFD52A]">{deletedname}</span>
        </p>
        <p className="text-sm leading-6 italic text-red-400">
          All The Data Related to this Class Also Deleted like Student,
          Attendance
        </p>
        <div className="flex flex-col gap-5">
          <Button
            onClick={deleteClass}
            className="bg-[#FFD52A] text-black font-bold"
          >
            Delete
          </Button>
          <Button onClick={() => setOpenModal(false)}>cancel</Button>
        </div>
      </div>
    );
  };
  

  return (
    <div className="">
      <p className="text-2xl text-center py-6">All Class's</p>
      <div className="flex flex-col w-[300px] mx-auto gap-4 ">
        {classList !== undefined &&
          classList.length > 0 &&
          classList.map((classobject) => (
            <Button
              key={classobject._id}
              // onClick={() => router("/takeattendance")}
              className="shadow-sm shadow-white sm:text-xs flex justify-between"
            >
              <FaClipboardList />
              <p>{classobject.name}</p>
              <div className="flex justify-center items-center gap-4">
                <span
                  onClick={() =>
                    handleUpadteModalOpen(classobject._id, classobject.name)
                  }
                >
                  <BiSolidEditAlt />
                </span>
                <span
                  onClick={() =>
                    handleDeleteModalOpen(classobject._id, classobject.name)
                  }
                >
                  <MdDelete />
                </span>
              </div>
            </Button>
          ))}
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setOpenModal(false)}>
          <ClassModalForm />
        </Modal>
      )}

      {updateModalOpen && (
        <Modal
          isOpen={updateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
        >
          <ClassNameUpdateForm className={updateClass?.name ? updateClass.name : ""} classId={updateClass?._id ? updateClass._id : ""}  onClose={() => setUpdateModalOpen(false)} fetchClass={()=>fetchAllClasses()} />
        </Modal>
      )}
    </div>
  );
};

export default Class;
