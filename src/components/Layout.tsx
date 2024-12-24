// import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Sidebar from "./general/Sidebar";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
// import { Button } from "./ui/button";
// import MobileSidebar from "./general/MobileSidebar";

const Layout = () => {
  // const token = Cookies.get("token");
  const [isMobile, setIsMobile] = useState(false);
  // const [open, setOpen] = useState(false);

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 768); // Adjust the width as per your requirement for "mobile"
  };

  useEffect(() => {
    checkIsMobile(); // Initial check

    // Add event listener to update on window resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  //   console.log("token =", token);

  return (
    <div className="flex flex-col">
      <div className="h-[8vh] border-b-2 py-4 pb-4 border-gray-600">
        <Navbar />
      </div>
      <div className="flex flex-1 relative">
        {/* {isAuthenticated && <MenuBar />} */}

        {/* Main content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="p-1 relative flex h-screen flex-1 overflow-x-hidden overflow-y-auto">
            <Sidebar isMobile ={isMobile}/>
            {/* {isMobile && <MobileSidebar open={open} Onclose={()=>setOpen(false)} />} */}
            <div className=" w-full h-full"><Outlet/></div>
          </div>
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
