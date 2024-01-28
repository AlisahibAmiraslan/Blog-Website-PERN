import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menus } from "../collections/pagesMenus";
import Navbar from "./Navbar";
import AccordionMenu from "./AccordionMenu";
import { AiOutlineHome } from "react-icons/ai";
import { useSelector } from "react-redux";

const Sidebar = ({ children }) => {
  const [Toggle, setToggle] = useState(false);

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar Toggle={Toggle} setToggle={setToggle} />
      <section className="w-full flex bg-[#f0f4f8]">
        <nav
          className={
            Toggle ? "sidebar-container" : "sidebar-container show-sidebar"
          }
        >
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
            {user?.userrole === "admin" && (
              <div>
                <AccordionMenu />
              </div>
            )}
          </div>
        </nav>

        <main className="w-full">{children}</main>
      </section>
    </>
  );
};

export default Sidebar;
