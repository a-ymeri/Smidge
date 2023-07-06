import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import App from "./App.tsx";
import "./index.css";

import List from "./routes/List.tsx";
import ReportPage from "./routes/ReportPage.tsx";

import Footer from "./components/Footer.tsx";
import Navbar from "./components/Navbar.tsx";
import AboutSmidge from "./routes/AboutSmidge.tsx";
import AboutUs from "./routes/AboutUs.tsx";

import config from "../config.json";
import { GoogleOAuthProvider } from "@react-oauth/google";

// eslint-disable-next-line react-refresh/only-export-components
const Page = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Page>
        <App />
      </Page>
    ),
  },

  {
    path: "/home",
    element: (
      <Page>
        <App />
      </Page>
    ),
  },
  {
    path: "/list",
    element: (
      <Page>
        <List key="page" />
      </Page>
    ),
  },
  {
    path: "/about",
    element: (
      <Page>
        <App />
      </Page>
    ),
  },
  {
    path: "/report",
    element: (
      <Page>
        <ReportPage></ReportPage>
      </Page>
    ),
  },
  {
    path: "/about-us",
    element: (
      <Page>
        <AboutUs></AboutUs>
      </Page>
    ),
  },
  {
    path: "/about-smidge",
    element: (
      <Page>
        <AboutSmidge></AboutSmidge>
      </Page>
    ),
  },
]);

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:7000"
    : "https://smidge.herokuapp.com";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
      <RouterProvider router={router}></RouterProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
