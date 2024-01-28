import { MdDashboard } from "react-icons/md";
import { CgArrowTopLeftR } from "react-icons/cg";

export const PagesCatMenus = [
  {
    id: 1,
    name: "DashBoard",
    CatChild: 4,
    url: "/",
    icon: <MdDashboard className="w-6 h-6" />,
  },
];

export const PageAltCatMenus = [
  {
    id: 1,
    name: "Add Blog",
    cat: "DashBoard",
    url: "/new-blog",
  },
  {
    id: 2,
    name: "Add Category",
    cat: "DashBoard",
    url: "/new-category",
  },
];

export const Menus = [
  {
    id: 1,
    name: "Blogs",
    url: "/blogs",
    icon: <CgArrowTopLeftR className="w-5 h-5" />,
  },
];
