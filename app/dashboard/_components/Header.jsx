"use client";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const path = usePathname();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Questions", path: "/dashboard/questions" },
    { name: "Upgrade", path: "/dashboard/upgrade" },
    { name: "How it works", path: "/dashboard/howitworks" },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/dashboard">
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                InterviewMe.ai
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`text-sm font-medium transition-colors duration-200 ease-in-out
                  ${
                    path === item.path
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
