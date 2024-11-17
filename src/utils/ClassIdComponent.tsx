import React, { useEffect, ReactNode } from "react"; // Import React and ReactNode
import { RootState } from "@/slices/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface ClassIdComponentProps {
    children: ReactNode;
}

const ClassIdComponent: React.FC<ClassIdComponentProps> = ({ children }) => {
    const router = useNavigate();
    const classobj = useSelector((state: RootState) => state.class);

    useEffect(() => {
        if (!classobj._id) {
            router('/class');
        }
    }, [classobj._id, router]);

    if (!classobj._id) {
        return null;
    }

    return (
        <div>
            {children}
        </div>
    );
}

export default ClassIdComponent;