import React, { useState, useEffect } from "react";
import Logo from "../assets/Images/logo.png";
import { FaAlignLeft } from "react-icons/fa";
import MobilMenu from "./MobilMenu";
import { Link, useLocation } from "react-router-dom";
import LogOut from "./LogOut";
import { useSelector } from "react-redux";

const Navbar = ({ Toggle, setToggle }) => {
  const [showMenu, setShowMenu] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const router = useLocation();

  useEffect(() => {
    setShowMenu(false);
  }, [router.pathname]);

  return (
    <header className="w-full py-3 border-b-2 px-8 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/">
          <img
            src={Logo}
            alt="Logo Pilot"
            className="object-center object-cover w-[150px]"
          />
        </Link>
        <div className="pl-24 lg:block hidden">
          <button
            type="button"
            className="toggle-btn"
            onClick={() => setToggle(!Toggle)}
          >
            <FaAlignLeft />
          </button>
        </div>
      </div>
      <div className="lg:block hidden">
        <h3 className="text-2xl">Wee Digitron Blog Website</h3>
      </div>
      <div className="lg:flex hidden items-center gap-3">
        {!user && (
          <div className="flex items-center gap-3">
            <div className="relative">
              <Link
                to="/login"
                className="flex no-underline text-white transition-all duration-300 justify-center items-center gap-2 py-2 px-4 bg-[#7355f8] hover:bg-[#70a0ed] w-full"
              >
                Login
              </Link>
            </div>
            <div className="relative">
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
      <div className="lg:hidden block">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => setShowMenu(!showMenu)}
        >
          <FaAlignLeft />
        </button>

        <div className="md:hidden block">
          <MobilMenu showMenu={showMenu} setShowMenu={setShowMenu} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
