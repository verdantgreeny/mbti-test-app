import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-black text-white py-4 px-10 flex justify-between items-center">
        <h1 className="text-xl font-bold">INF∞</h1>
        <div className="space-x-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        </div>
      </nav>
      <main className="mx-auto my-0 pt-10 grid place-items-center">
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default Layout;
