import React from "react";
import { Button } from "../ui/button";

// Define the props interface for the Modal component
interface ModalProps {
  children: React.ReactNode; // This can be any valid React node (string, JSX, etc.)
  isOpen: boolean; // Indicates whether the modal is open
  onClose: () => void; // Function to close the modal
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-25 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div
        className="relative z-10 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          className="absolute text-[40px] bg-transparent text-[#FFD52A] z-50 top-0 right-6 hover:text-gray-900"
          onClick={onClose}
        >
          &times; {/* Close button */}
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;