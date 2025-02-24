import React, { useContext, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { ROUTES } from "../constants/routes";

const Layout = () => {
  const { isAuthenticated, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { HOME, LOGIN, SIGNUP, PROFILE, TEST_PAGE, TEST_RESULT_PAGE } = ROUTES;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    toast.success("로그아웃되었습니다.");
    navigate(HOME);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 네비게이션 바 */}
      <nav className="bg-black text-white py-4 px-4 flex justify-between items-center relative md:px-10 ">
        {/* 로고 영역 */}
        <div className="mb-4 md:mb-0">
          <img
            src="/logo.png"
            alt="레이아웃 INF∞ 로고"
            className="w-20 hover:animate-wiggle transition-transform duration-2000 md:w-28"
          />
        </div>
        {/* 모바일 햄버거 버튼 (md 이상에서는 히든!!) */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen((prev) => !prev)}>
            <svg className="w-6 h-6" fill="none" stroke="white">
              {/* 햄버거 모양 만들기 */}
              <path
                strokeLinecap="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" // 가로 3줄 그려줘서 햄버거 모양 만들어 줌
              />
            </svg>
          </button>
        </div>
        {/* 데스크탑 메뉴 */}
        <div className="md:flex md:items-center md:space-x-6 hidden">
          <Link to={HOME} className="hover:underline">
            Home
          </Link>
          {!isAuthenticated ? (
            <>
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
        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          //네비게이션 바 아래에 배치
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

      {/* 메인 컨텐츠 영역 */}
      <main className="bg-black flex-grow p-4 md:p-6">
        <Outlet />
      </main>

      {/* 푸터 영역 */}
      <footer className="bg-black text-white text-center py-4">
        © 2025 INF∞. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
