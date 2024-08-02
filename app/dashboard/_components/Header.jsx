"use client";
import React, { useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const Header = () => {
  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="relative flex p-4 items-center justify-between bg-primary shadow-sm text-white">
      <div className="relative z-10 font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-yellow-500">
        InterviewMe.ai
      </div>
      <ul className="hidden md:flex gap-6 relative z-10">
        <li
          className={`hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:font-bold transition-all

          ${
            path == "/dashboard" &&
            "bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-bold"
          }

        `}
        >
          Dashboard
        </li>
        <li
className={`hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 hover:font-bold transition-all

          ${path == "/dashboard/questions" && "text-primary font-bold"}
        `}
        >
          Questions
        </li>
        <li
className={`hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 hover:font-bold transition-all

          ${path == "/dashboard/upgrade" && "text-primary font-bold"}
        `}
        >
          Upgrade
        </li>
        <li
          className={`hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 hover:font-bold transition-all

          ${path == "/dashboard/howitworks" && "text-primary font-bold"}
        `}
        >
          How it works
        </li>
      </ul>
      <UserButton className="relative z-10" />
    </div>
  );
};

export default Header;
