import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { RiBilliardsLine } from "react-icons/ri";
import { Link } from "react-router-dom";

//

const role = "admin";

const Sidebar = () => {
  const menuItems = [
    {
      id: 1,
      name: "Dashboard",
      link: "/",
      icons: <MdOutlineDashboard />,
      visible: ["admin"],
    },
    {
      id: 2,
      name: "Products",
      link: "/product",
      icons: <AiOutlineProduct />,
      visible: ["admin"],
    },
    {
      id: 3,
      name: "Category",
      link: "/category",
      icons: <BiCategory />,
      visible: ["admin"],
    },
    {
      id: 4,
      name: "Billing",
      link: "/billing",
      icons: <RiBilliardsLine />,
      visible: ["admin", "staff"],
    },
  ];
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => {
        if (i.visible.includes(role)) {
          return (
            <Link
              to={i.link}
              key={i.name}
              className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md"
            >
              <span className=" text-lg">{i.icons}</span>
              <span className="hidden lg:block">{i.name}</span>
            </Link>
          );
        }
      })}
    </div>
  );
};

export default Sidebar;
