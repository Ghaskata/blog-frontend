import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ytLogo from "../images/yt-logo.png";
import ytLogoMobile from "../images/yt-logo-mobile.png";
import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import Loader from "../shared/loader";
import LeftNav from "./LeftNav";
import MobileLeftNav from "./MobileLeftNave";
import { useSelector } from "react-redux";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSidebar, setopenSidebar] = useState(false);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.data);

  console.log("user ",user)
  const searchQueryHandler = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery?.length > 0
    ) {
      navigate(`/searchResult/${searchQuery}`);
    }
  };

  const { pathname } = useLocation();
  const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

  return (
    <>
      <div className="fixed w-screen top-0 start-0 z-40 flex flex-row items-center justify-between h-16 px-4 md:px-5 bg-white dark:bg-black">
        <div className="flex h-5 items-center">
          {pageName !== "video" && (
            <div className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
              <CgClose
                className={`text-white text-xl ${
                  openSidebar ? "block " : "hidden"
                } `}
                onClick={() => setopenSidebar(!openSidebar)}
              />
              <SlMenu
                className={`text-white text-xl ${
                  openSidebar ? "hidden" : "block"
                } `}
                onClick={() => setopenSidebar(!openSidebar)}
              />
            </div>
          )}
          <Link to="/" className="flex h-5 items-center">
            <img
              className="h-full hidden dark:md:block"
              src={ytLogo}
              alt="Youtube"
            />
            <img
              className="h-full md:hidden"
              src={ytLogoMobile}
              alt="Youtube"
            />
          </Link>
        </div>
        <div className="group flex items-center">
          <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
            <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
              <IoIosSearch className="text-white text-xl" />
            </div>
            <input
              type="text"
              className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              placeholder="Search"
              value={searchQuery}
            />
          </div>
          <button
            className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]"
            onClick={() => searchQueryHandler("searchButton")}
          >
            <IoIosSearch className="text-white text-xl" />
          </button>
        </div>
        <div className="flex items-center">
          <div className="hidden md:flex">
            <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
              <RiVideoAddLine className="text-white text-xl cursor-pointer" />
            </div>
            <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
              <FiBell className="text-white text-xl cursor-pointer" />
            </div>
          </div>
          <div className="flex h-8 w-8 overflow-hidden bg-white rounded-full md:ml-4">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
      <MobileLeftNav
        openSidebar={openSidebar}
        setopenSidebar={setopenSidebar}
      />
      <LeftNav />
    </>
  );
};

export default Header;
