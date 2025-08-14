import React from "react";
import Nabar from "../Nabar/Nabar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

function Layout() {
  return (
    <>
      <Nabar />
      <div className='container mx-auto min-h-screen'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
