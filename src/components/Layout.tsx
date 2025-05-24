import { useEffect, useState } from "react";
import Sidebar from "./general/Sidebar";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
// import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "@/slices/store";

const Layout = () => {
  const [isMobile, setIsMobile] = useState(false);
  // const token = Cookies.get("token");
  const teacher = useSelector((state: RootState)=> state.teacher)

  const token = teacher.token ? teacher.token : null;

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

  console.log(token);

  return (
    <div className="flex flex-col h-[100vh] min-h-[100vh] w-full bg-[#000814] text-white">
      {/* Navbar */}
      {!isMobile && <div className="h-[8vh] border-b-2 border-gray-600">
            <Navbar />
          </div>}

      {/* Main Content Area */}
      <div className="flex h-full w-[100%] ">
        {/* Sidebar */}

        {token && <div className=" sm:absolute sm:top-0">
          <Sidebar isMobile={isMobile} />
        </div>}

        {/* Main Content */}
        <main className="h-[100vh] w-[100vw] sm:w-full overflow-x-hidden pb-20">
          {isMobile && <div className="sm:h-[8vh] border-b-2 border-gray-600">
            <Navbar />
          </div>}

          <Outlet />
        </main>
      </div>
    </div>
  );

  // return token ? (
  //   <div className="flex flex-col min-h-[calc(100vh)] bg-[#000814] text-white">
  //     <div className="border-b-2 sm:h-[7vh] h-[8vh]"><Navbar /></div>
  //     <div className="flex flex-1">
  //       {token && <Sidebar isMobile={isMobile} />}
  //       <main className="flex-1 bg-[#000814] text-white overflow-x-hidden">
  //         <div className="p-4">
  //           <Outlet />
  //         </div>
  //       </main>
  //     </div>
  //   </div>
  // ) : (
  //   <div className="flex items-center justify-center min-h-screen">
  //     <Outlet />
  //   </div>
  // );  

};

export default Layout;
