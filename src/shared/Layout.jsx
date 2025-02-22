import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Layout = () => {
  const { isAuthenticated, logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser();
    toast.success("로그아웃되었습니다.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 네비게이션 바 */}
      <nav className="bg-black text-white py-4 px-10 flex justify-between items-center">
        {/* <h1 className="text-xl font-bold">INF∞</h1> */}
        <img
          src="../../public/logo.png"
          alt="레이아웃 로고"
          className="w-24 hover:animate-wiggle transition-transform duration-2000"
        />
        <div className="space-x-6">
          {/* 로그인 여부에 따라 링크 조건부 렌더링 */}
          <Link to="/" className="hover:underline">
            Home
          </Link>
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/signup" className="hover:underline">
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
              <Link to="/test-page" className="hover:underline">
                Test Page
              </Link>
              <Link to="/test-result-page" className="hover:underline">
                Test Results
              </Link>
              <button
                onClick={handleLogout} // 로그아웃 함수 연결
                className="hover:underline text-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* 메인 컨텐츠 영역 */}
      <main className="bg-black flex-grow p-6">
        <Outlet />
      </main>

      {/* 푸터 영역 */}
      <footer className="bg-black text-white text-center py-4">
        © {new Date().getFullYear()} INF∞. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
