import { useEffect, useState } from "react";
import Sidebar from "./general/Sidebar";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const Layout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const token = Cookies.get("token");

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
      {!isMobile && <div className="h-[8vh] border-b-2 border-gray-600">
            <Navbar />
          </div>}

      {/* Main Content Area */}
      <div className="flex relative h-full w-[100%] ">
        {/* Sidebar */}

        {token && <div className="">
          <Sidebar isMobile={isMobile} />
        </div>}

        {/* Main Content */}
        <main className="h-[100vh] w-[98vw] sm:w-full overflow-y-scroll ">
          {isMobile && <div className="sm:h-[8vh] border-b-2 border-gray-600">
            <Navbar />
          </div>}

          <Outlet />

          {/* Footer */}
          <footer className="mt-8 sm:p-4">Footer Content</footer>
        </main>
      </div>
    </div>
  );
};

export default Layout;
