import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "./Navbar";
const Layout = () => {
  return( <React.Fragment>
             <Navbar/>
             <Outlet/>
          </React.Fragment>
  )
          
}

export default Layout
