import { Fragment, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { AiFillEnvironment } from "react-icons/ai";
// import { IoIosSearch } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import {
  FaChalkboardTeacher,
  FaPlusCircle,
  FaListUl,
  FaChartBar,
  FaGraduationCap,
  FaUserPlus,
  FaUserFriends,
  FaClipboardList,
} from "react-icons/fa";
import { MdAssignmentTurnedIn, MdShare } from "react-icons/md";
// import { IoImages } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";

import { IoChevronDownSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoIosCheckmarkCircle } from "react-icons/io";

type Props = {
  isMobile: boolean;
};

const SideBar = (props: Props) => {
  const [open, setOpen] = useState(true);
  //   const [submenuOpen, setSubmenuOpen] = useState(false);
  const [submenuOpenState, setSubmenuOpenState] = useState<
    Record<number, boolean>
  >({});

  const toggleSubmenu = (index: number) => {
    setSubmenuOpenState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const router = useNavigate();

  const handleMenuClick = (route: string) => {
    if (route) {
      router(route);
      setOpen(false);
    }
    // if (action === "copyParentAttendanceLink") {
    //   copyParentAttendanceLink();
    // }
  };

  const Menus = [
    {
      title: "Class",
      submenu: true,
      icon: <FaChalkboardTeacher />,
      submenuitem: [
        {
          title: "Create Class",
          icon: <FaPlusCircle />,
          route: "/classCreate",
        },
        {
          title: "All Classes",
          icon: <FaListUl />,
          route: "/class",
        },
        {
          title: "Class Overall",
          icon: <FaChartBar />,
          route: "/classOverall",
        },
      ],
    },
    {
      title: "Student",
      submenu: true,
      icon: <FaGraduationCap />,
      submenuitem: [
        {
          title: "Create Student",
          icon: <FaUserPlus />,
          route: "/student/add",
        },
        {
          title: "Student List",
          icon: <FaUserFriends />,
          route: "/viewStudentList",
        },
      ],
    },
    {
      title: "Attendance",
      submenu: true,
      icon: <MdAssignmentTurnedIn />,
      submenuitem: [
        {
          title: "Take Attendance",
          icon: <FaClipboardList />,
          route: "/takeattendance",
        },
        {
          title: "Take New Attendance",
          icon: <FaClipboardList />,
          route: "/newattendance",
        },
        {
          title: "Parent Share",
          icon: <MdShare />,
          route: "/parentshare",
        },
        {
          title: "Check Attendance",
          icon: <IoIosCheckmarkCircle />,
          route: "/classAttendance",
        }
      ],
    },
    {
      title: "Pricing",
      submenu: true,
      icon: <MdAttachMoney />,
      submenuitem: [
        {
          title: "Pricing",
          icon: <IoIosCheckmarkCircle />,
          route: "/pricing",
        }
      ],
    },
    // { title: "Pages", icon: <FaFileAlt /> },
    // { title: "Media", icon: <IoImages />, spacing: true },
    { title: "Logout", icon: <RiLogoutCircleLine />, spacing: true },
  ];

  return (
    <div
      className={`bg-dark-purple h-[100%] bg-[#000814] p-5 pt-8 duration-300 border-r-2 border-amber-300 shadow-md shadow-white overflow-y-scroll ${
        open ? "w-72" : `w-16 ${props.isMobile && "-ml-[70px]"}`
      } ${
        props.isMobile
          ? "absolute top-0 left-0 h-screen z-10"
          : "relative h-full"
      }`}
    >
      <IoIosArrowRoundBack
        onClick={() => setOpen(!open)}
        className={`${
          !open && "rotate-180"
        }  text-dark-purple bg-white text-[#000814] border text-4xl rounded-full absolute -right-11 top-2 border-dark-purple cursor-pointer`}
      />

      {
        <div className="inline-flex mt-4 sm:text-sm">
          <AiFillEnvironment
            className={`bg-[#FFD52A] text-[#000814] sm:text-[30px] text-4xl rounded cursor-pointer block float-left mr-2 duration-300 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white sm:text-2lg origin-left font-medium text-2xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            DashBoard
          </h1>
        </div>
      }

      {/* menu */}
      <ul>
        {Menus.map((menu, index) => (
          <Fragment key={index}>
            <li
              key={index}
              className={`text-gray-300 text-sm flex items-center gap-x-4   cursor-pointer p-1 hover:bg-light-white rounded-md  ${
                menu.spacing ? "mt-9" : "mt-2"
              }`}
            >
              <span className="text-2xl sm:text-sm block float-left">
                {menu.icon ? menu.icon : <MdDashboard />}
              </span>
              <span
                className={`text-base sm:text-lg font-medium flex-1 duration-200 ${
                  !open && "hidden "
                }`}
                onClick={() => toggleSubmenu(index)}
              >
                {menu.title}
              </span>
              {menu.submenu && open && (
                <IoChevronDownSharp
                  className={`${
                    submenuOpenState[index] ? "rotate-180" : ""
                  } transition-transform duration-200`}
                  onClick={() => toggleSubmenu(index)}
                />
              )}
            </li>
            {menu.submenu && submenuOpenState[index] && open && (
              <ul>
                {menu?.submenuitem?.map((submenuItem, index) => (
                  <li
                    className="text-amber-300 border-l-2 text-md flex items-center gap-x-1 cursor-pointer p-2 pr-5 ml-3 hover:bg-light-white"
                    key={index}
                    onClick={() => handleMenuClick(submenuItem.route)}
                  >
                    -
                    <span className="text-2xl sm:text-sm block float-left">
                      {submenuItem.icon ? submenuItem.icon : <MdDashboard />}
                    </span>
                    {submenuItem.title}
                  </li>
                ))}
              </ul>
            )}
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
