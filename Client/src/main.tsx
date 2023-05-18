import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Divider } from "@mui/material";
import axios from "axios";
import App from "./App.tsx";
import "./index.css";
import List from "./routes/List.tsx";
import Footer from "./components/Footer.tsx";

import Navbar from "./components/Navbar.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <App />
        <Footer />
      </>
    ),
  },

  {
    path: "/home",
    element: (
      <>
        <Navbar />
        <App />
        <Footer />
      </>
    ),
  },
  {
    path: "/list",
    element: (
      <>
        <Navbar />
        <List />
        <Footer />
      </>
    ),
  },
]);

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:7000"
    : "https://smidge.herokuapp.com";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
