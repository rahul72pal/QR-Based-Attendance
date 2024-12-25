import { useEffect, useState } from "react";
import Sidebar from "./general/Sidebar";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isMobile, setIsMobile] = useState(false);

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return (
    <div className="flex flex-col h-[120vh] min-h-[100vh] w-full">
      {/* Navbar */}
      <div className="h-[8vh] border-b-2 border-gray-600">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <div className="flex relative w-[100%] ">
        {/* Sidebar */}
        
          <div className="">
            <Sidebar isMobile={isMobile} />
          </div>
        

        {/* Main Content */}
        <main className="overflow-y-auto h-[92vh] w-full ">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="h-[8vh] border-t-2 border-gray-600 text-center">
        Footer Content
      </footer>
    </div>
  );
};

export default Layout;
