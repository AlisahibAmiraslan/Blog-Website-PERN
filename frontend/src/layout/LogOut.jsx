import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";

const LogOut = () => {
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div>
      {user && (
        <div className="relative top-5">
          <button
            className="flex text-white transition-all duration-300 justify-center items-center gap-2 py-2 px-4 bg-[#7355f8] hover:bg-[#70a0ed] w-full"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle /> {user ? `${user?.username}` : "Çıkış Yap"}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={onLogout}>
              Çıkış Yap
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogOut;
