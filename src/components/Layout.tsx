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

      {/* Main Content Area */}
      <div className="flex relative h-full w-[100%] ">
        {/* Sidebar */}

        <div className="">
          <Sidebar isMobile={isMobile} />
        </div>

        {/* Main Content */}
        <main className="h-[92vh] w-full overflow-y-scroll ">
          <div className="h-[8vh] border-b-2 border-gray-600">
            <Navbar />
          </div>

          <Outlet />

          {/* Footer */}
          <footer className="mt-8">Footer Content</footer>
        </main>
      </div>
    </div>
  );
};

export default Layout;
