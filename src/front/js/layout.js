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
import PrivateRoute from "./component/route-guard";

//create your first component
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
            <PrivateRoute element={<MyCalendar />} path="/calendar" />
            <PrivateRoute element={<Profile />} path="/profile" />
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
