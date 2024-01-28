import React from "react";
import AccordionMenu from "./AccordionMenu";
import { Menus } from "../collections/pagesMenus";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import LogOut from "./LogOut";
import { useSelector } from "react-redux";

const MobilMenu = ({ showMenu, setShowMenu }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className={
        showMenu
          ? "w-full h-screen fixed left-0 top-0 pt-7 bg-white px-3 transition-all duration-700 ease-in-out mobil-menu z-50 overflow-auto"
          : "left-[500px] w-full h-screen fixed top-0 pt-7 bg-white px-3 transition-all duration-700 ease-in-out mobil-menu z-50 overflow-auto"
      }
    >
      <div className="w-full flex justify-end mb-3">
        <button
          className="px-3 py-1 bg-black text-white"
          onClick={() => setShowMenu(!showMenu)}
        >
          X
        </button>
      </div>
      <nav>
        <div>
          <div>
            <Link to="/">
              <AiOutlineHome className="w-6 h-6 mr-3" />
              Anasayfa
            </Link>
          </div>
          <div>
            {Menus.map((menu) => {
              return (
                <div key={menu.id}>
                  <Link to={menu.url}>
                    <span className="mr-3">{menu.icon}</span>
                    {menu.name}
                  </Link>
                </div>
              );
            })}
          </div>
          <div>{user?.userrole === "admin" && <AccordionMenu />}</div>
        </div>
      </nav>
      <div className="lg:hidden block border-t">
        {!user && (
          <div className="flex items-center flex-col gap-3 mt-5">
            <div className="relative w-full">
              <Link
                to="/login"
                className="flex no-underline text-white transition-all duration-300 justify-center items-center gap-2 py-2 px-4 bg-[#7355f8] hover:bg-[#70a0ed] w-full"
              >
                Login
              </Link>
            </div>
            <div className="relative w-full">
              <Link
                to="/register"
                className="flex no-underline text-black justify-center items-center gap-2 py-2 px-4 bg-[#cef261] w-full"
              >
                Register
              </Link>
            </div>
          </div>
        )}
        {user && (
          <div className="relative">
            <Link
              to="/my-account"
              className="flex no-underline text-black justify-center items-center gap-2 py-2 px-4 bg-[#cef261] w-full"
            >
              My Account
            </Link>
          </div>
        )}
        <LogOut />
      </div>
    </div>
  );
};

export default MobilMenu;
