import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTES } from "../constants/routes";
import useAuthStore from "../zustand/bearsStore";

const Header = () => {
  const { isAuthenticated, logoutUser } = useAuthStore();
  const { HOME, LOGIN, SIGNUP, PROFILE, TEST_PAGE, TEST_RESULT_PAGE } = ROUTES;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    toast.success("로그아웃되었습니다.");
    navigate(HOME);
  };

  return (
    <header>
      <nav className="bg-black text-white py-4 px-4 flex justify-between items-center relative md:px-10">
        <div className="mb-4 md:mb-0">
          <img
            src="/logo.png"
            alt="레이아웃 INF∞ 로고"
            className="w-20 hover:animate-wiggle transition-transform duration-2000 md:w-28"
          />
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen((prev) => !prev)}>
            <svg className="w-6 h-6" fill="none" stroke="white">
              <path
                strokeLinecap="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div className="md:flex md:items-center md:space-x-6 hidden">
          <Link to={HOME} className="hover:underline">
            Home
          </Link>
          {!isAuthenticated ? (
            <>
              <Link to={TEST_RESULT_PAGE} className="hover:underline">
                Test Results
              </Link>
              <Link to={LOGIN} className="hover:underline">
                Login
              </Link>
              <Link to={SIGNUP} className="hover:underline">
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link to={PROFILE} className="hover:underline">
                Profile
              </Link>
              <Link to={TEST_PAGE} className="hover:underline">
                Test Page
              </Link>
              <Link to={TEST_RESULT_PAGE} className="hover:underline">
                Test Results
              </Link>
              <button
                onClick={handleLogout}
                className="hover:underline text-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black text-white p-4 md:hidden z-50 opacity-90">
            <div className="flex flex-col space-y-2">
              <Link
                onClick={() => setIsMenuOpen(false)}
                to={HOME}
                className="hover:underline"
              >
                Home
              </Link>
              {!isAuthenticated ? (
                <>
                  <Link to={TEST_RESULT_PAGE} className="hover:underline">
                    Test Results
                  </Link>
                  <Link
                    onClick={() => setIsMenuOpen(false)}
                    to={LOGIN}
                    className="hover:underline"
                  >
                    Login
                  </Link>
                  <Link
                    onClick={() => setIsMenuOpen(false)}
                    to={SIGNUP}
                    className="hover:underline"
                  >
                    Signup
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    onClick={() => setIsMenuOpen(false)}
                    to={PROFILE}
                    className="hover:underline"
                  >
                    Profile
                  </Link>
                  <Link
                    onClick={() => setIsMenuOpen(false)}
                    to={TEST_PAGE}
                    className="hover:underline"
                  >
                    Test Page
                  </Link>
                  <Link
                    onClick={() => setIsMenuOpen(false)}
                    to={TEST_RESULT_PAGE}
                    className="hover:underline"
                  >
                    Test Results
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="hover:underline text-red-700"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
