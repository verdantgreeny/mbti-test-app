import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="bg-black flex-grow p-4 md:p-6">
        <Outlet />
      </main>

      <footer className="bg-black text-white text-center py-4">
        © 2025 INF∞. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
