import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeContext } from "../contexts/ThemeContext";

const MainLayout = () => {
  const {theme} = useContext(ThemeContext);
  
  return (
    <div className={`bg-${theme}`}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
