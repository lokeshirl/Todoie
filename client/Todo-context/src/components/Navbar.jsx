import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleUserLogout = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    await logout();
  };
  return (
    <header>
      <div
        className={`max-w-[1400px] flex items-center justify-between mx-auto my-0 px-5 py-5 bg-[#172842] text-white`}
      >
        <Link to="/">
          <h1>📝TODOIE</h1>
        </Link>
        <nav className="flex items-center">
          {user ? (
            <div>
              <span>{user?.email}</span>
              <button
                onClick={handleUserLogout}
                className="bg-green-600 py-1 px-3 rounded-md cursor-pointer text-[1em] ml-2.5"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login" className="mx-5">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-600 py-1 px-3 rounded-md cursor-pointer text-[1em] ml-2.5"
              >
                Signup
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
