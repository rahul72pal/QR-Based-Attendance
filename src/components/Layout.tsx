import Cookies from "js-cookie";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const token = Cookies.get("token");

//   console.log("token =", token);

  return token ? (
    <div className="flex flex-col">
      <div className="h-[8vh] border-b-2 py-4 pb-4 border-gray-600">
        <Navbar />
      </div>
      <div className="flex flex-1 h-[calc(100vh)]">
        {/* {isAuthenticated && <MenuBar />} */}
        {/* Main content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="p-1">
            <Outlet />
          </div>
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen ">
      <Outlet />
    </div>
  );
};

export default Layout;
