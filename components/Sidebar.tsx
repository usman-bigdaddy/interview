"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiUser, HiPhotograph, HiStar, HiBriefcase } from "react-icons/hi";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState("experience");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { id: "about", icon: <HiUser className="h-5 w-5" />, label: "About" },
    { id: "media", icon: <HiPhotograph className="h-5 w-5" />, label: "Media" },
    {
      id: "highlights",
      icon: <HiStar className="h-5 w-5" />,
      label: "Highlights",
    },
    {
      id: "experience",
      icon: <HiBriefcase className="h-5 w-5" />,
      label: "Experience",
    },
  ];

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 transform transition-transform duration-200 ease-in-out 
          bg-white w-64 border-r border-gray-200 fixed md:static h-full z-20
          ${isMobile ? "shadow-xl" : ""}
        `}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex-1">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => {
                    setActiveLink(item.id);
                    if (isMobile) {
                      toggleSidebar();
                    }
                  }}
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    activeLink === item.id
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  aria-current={activeLink === item.id ? "page" : undefined}
                >
                  <span className="mr-3 text-gray-500">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
