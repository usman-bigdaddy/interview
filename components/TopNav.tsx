"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Swal from "sweetalert2";
import {
  HiOutlineMenu,
  HiChevronDown,
  HiChevronUp,
  HiX,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePencilAlt,
} from "react-icons/hi";

interface TopNavProps {
  toggleSidebar: () => void;
}

export default function TopNav({ toggleSidebar }: TopNavProps) {
  const [currentRole, setCurrentRole] = useState("Church Singer");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const roles = ["Church Singer", "Music Director", "Vocal Coach"];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingModalOpen(false);
    Swal.fire({
      title: "Booking Confirmed!",
      text: "Thank you for booking a session.",
      icon: "success",
      confirmButtonText: "Close",
    });
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="md:hidden text-gray-500 hover:text-gray-600"
              aria-label="Toggle sidebar"
            >
              <HiOutlineMenu className="h-6 w-6" />
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-expanded={isDropdownOpen}
              >
                <span className="font-medium">{currentRole}</span>
                {isDropdownOpen ? (
                  <HiChevronUp className="h-4 w-4" />
                ) : (
                  <HiChevronDown className="h-4 w-4" />
                )}
              </button>

              {isDropdownOpen && (
                <div
                  className={`absolute ${
                    isMobile ? "right-0" : "left-0"
                  } mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50`}
                >
                  {roles.map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setCurrentRole(role);
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        currentRole === role
                          ? "bg-gray-100 text-gray-900"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              $100 - $400 / per group workshop
            </span>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-1"
            >
              Book Now
            </button>
          </div>
        </div>
      </header>
      {isBookingModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
          <div className="absolute inset-0 backdrop-blur-sm bg-white/30"></div>
          <div className="relative bg-white shadow-2xl rounded-lg p-6 w-full max-w-md pointer-events-auto">
            <button
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <HiX className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <HiOutlinePencilAlt className="text-blue-600" />
              Book a Session
            </h2>

            <form onSubmit={handleBookingSubmit} className="grid gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <HiOutlineUser className="text-gray-500" />
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Please enter your name"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <HiOutlineMail className="text-gray-500" />
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Please enter your email"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <HiOutlineCalendar className="text-gray-500" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <HiOutlineClock className="text-gray-500" />
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    required
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Any specific requests or notes"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center gap-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center gap-1"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
