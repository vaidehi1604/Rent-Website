import React, { useState } from "react";
import Logo from "../assets/rent2.png";
import { Link } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserNavbar = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("User Successfully Logout!");
      })
      .catch((error) => {
        toast.error("User Not Logout!");
      });

    navigate("/");
  };
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between  p-4">
        <div className="flex justify-start">
          <Link className="flex ml-2 md:mr-24">
            <img src={Logo} className="h-10 mr-3" alt="FlowBite Logo" />
            <span className="italic self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
              ForRent
            </span>
          </Link>
        </div>
        <div className="flex md:order-2">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              name={menuOpen ? "close" : "menu"}
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div
          className={`items-center justify-center w-full md:flex md:w-auto md:order-1 ${
            menuOpen ? "block" : "hidden"
          }`}
          id="navbar-cta"
        >
          <ul className="md:my-0 my-7 transition-all duration-500 ease-in flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
            <li>
              <Link
                className="block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-cyan-600 md:hover:text-cyan-700 md:p-0 md:dark:hover:text-cyan-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-cyan-700"
                to="/userdashboard"
              >
                HOME
              </Link>
            </li>

            <li>
              <Link
                className="block py-2 pl-3 pr-4 text-cyan-900 rounded hover:bg-cyan-100 md:hover:bg-transparent md:hover:text-cyan-700 md:p-0 md:dark:hover:text-cyan-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to="/userproduct"
              >
                ADD PRODUCT
              </Link>
            </li>
            <li>
              <Link
                className="block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-cyan-600 md:hover:text-cyan-700 md:p-0 md:dark:hover:text-cyan-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-cyan-700"
                to="/admin"
              >
                ADMIN DATA
              </Link>
            </li>
            {/* <li>
              <Link
                className="block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-cyan-600 md:hover:text-cyan-700 md:p-0 md:dark:hover:text-cyan-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-cyan-700"
                to="/navbar"
              >
                Admin
              </Link>
            </li> */}

            <li className="hover:font-bold">
              <button
                className="ml-3  p-10  text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 text-center mr-3 md:mr-0 dark:bg-cyan-700 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                onClick={() => logout()}
              >
                LogOut
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
