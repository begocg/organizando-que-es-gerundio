import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";
import ScrollToTop from "./component/scrollToTop";

import { Blank } from "./pages/blank";
import { MyCalendar } from "./pages/calendar/calendar";
import { Home } from "./pages/home/home";
import { Profile } from "./pages/profile/profile";
import injectContext from "./store/appContext";

import { Footer } from "./component/footer";
import { Navbar } from "./component/navbar/navbar";
import { Navigate } from 'react-router-dom';

//create your first component
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  if (typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function') {
    const token = localStorage.getItem("jwt-token");
    if (!token) {
      return <Navigate to="/home" />;
    }
  } else {
    console.error("localStorage is not available");
    return <Navigate to="/home" />;
  }
  return <Component {...rest} />;
};

const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/home" />
            <Route
              element={<PrivateRoute element={<MyCalendar />} />}
              path="/calendar"
            />
            <Route
              element={<PrivateRoute element={<Profile />} />}
              path="/profile"
            />
            <Route element={<Blank />} path="/notfound" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
