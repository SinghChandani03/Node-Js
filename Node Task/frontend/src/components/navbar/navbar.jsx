"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isAddPageOpen, setIsAddPageOpen] = useState(false); // New state for Add Project page
  const navbarRef = useRef(null);
  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
    setIsDropdownOpen(false);
    setIsProfileDropdownOpen(false);
    setIsAddPageOpen(false); // Close Add Project page when toggling navbar
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsProfileDropdownOpen(false);
    setIsAddPageOpen(false); // Close Add Project page when toggling Project dropdown
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsDropdownOpen(false);
    setIsAddPageOpen(false); // Close Add Project page when toggling Profile dropdown
  };

  const toggleAddPage = () => {
    setIsAddPageOpen(!isAddPageOpen);
    setIsNavbarOpen(false); // Close navbar when opening Add Project page
    setIsDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
    setIsDropdownOpen(false);
    setIsProfileDropdownOpen(false);
    setIsAddPageOpen(false); // Close Add Project page when closing navbar
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        closeNavbar();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  return (
    <div>
      <nav
        className="shadow-md bg-teal-700 dark:bg-gray-800 fixed top-0 left-0 w-full z-10"
        ref={navbarRef}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-3xl font-semibold whitespace-nowrap text-white">
              Task Management
            </span>
          </div>

          {/* Button to toggle the navbar on mobile */}
          <button
            onClick={toggleNavbar}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm bg-white text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isNavbarOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Main navigation links */}
          <div
            className={`md:flex md:items-center md:w-auto ${
              isNavbarOpen ? "block" : "hidden"
            }`}
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4  rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent dark:border-gray-700">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 text-white rounded md:text-white md:p-0 dark:text-white"
                  aria-current="page"
                  onClick={closeNavbar}
                >
                  Home
                </Link>
              </li>
              <li className="relative" ref={dropdownRef}>
                {/* Button to toggle the Project dropdown */}
                <button
                  className="block py-2 px-3 text-white hover:text-green-400 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={toggleDropdown}
                >
                  Project
                </button>

                {/* Dropdown menu for Project */}
                {isDropdownOpen && (
                  <ul className="absolute left-0 mt-2 w-48 bg-gray-100 border border-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-600 z-20">
                    <li>
                      <Link
                        href="/projectcrud"
                        className="block py-2 px-4 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600 md:dark:hover:bg-gray-600"
                        onClick={closeNavbar}
                      >
                        Add Project
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/displayproject"
                        className="block py-2 px-4 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600"
                        onClick={closeNavbar}
                      >
                        Projects
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link
                  href="#"
                  className="block py-2 px-3 text-white rounded md:text-white md:p-0 dark:text-white"
                  onClick={closeNavbar}
                >
                  About
                </Link>
              </li>

              <li className="relative" ref={profileDropdownRef}>
                {/* Button to toggle the Profile dropdown */}
                <button
                  className="flex items-center ml-2 text-sm rounded-full border border-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 dark:focus:ring-gray-600"
                  onClick={toggleProfileDropdown}
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={"ticon.jpg"}
                    alt="Profile"
                  />
                </button>
                {/* Dropdown menu for Profile */}
                {isProfileDropdownOpen && (
                  <ul className="absolute left-0 mt-2 w-48 bg-gray-100 border border-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-600 z-20">
                    <li>
                      <Link
                        href="/login"
                        className="block py-2 px-4 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-200"
                        onClick={closeNavbar}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/signup"
                        className="block py-2 px-4 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600"
                        onClick={closeNavbar}
                      >
                        Sign Up
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/logout"
                        className="block py-2 px-4 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600"
                        onClick={closeNavbar}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
