// src/components/Navbar.js

import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // State to handle mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-opacity-50 shadow-lg h-20 flex items-center z-50 backdrop-filter backdrop-blur-lg">
      <div className="w-10/12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Website Name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              {/* Replace the div below with an actual logo image if available */}
              <div className="text-2xl font-bold text-white">TravelGear</div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-lg font-medium"
            >
              Home
            </Link>

            <Link
              to="/login"
              className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-lg font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-lg font-medium"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-white hover:text-yellow-400 focus:outline-none focus:text-yellow-400"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed: Hamburger Menu */}
              {!isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              ) : (
                // Icon when menu is open: Close (X) icon
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block text-white hover:text-yellow-400 px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="block text-white hover:text-yellow-400 px-3 py-2 rounded-md text-base font-medium"
            >
              Features
            </Link>
            <Link
              to="/about"
              className="block text-white hover:text-yellow-400 px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
            <Link
              to="/login"
              className="block text-white hover:text-yellow-400 px-3 py-2 rounded-md text-base font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block text-white hover:text-yellow-400 px-3 py-2 rounded-md text-base font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
