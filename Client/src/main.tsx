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
