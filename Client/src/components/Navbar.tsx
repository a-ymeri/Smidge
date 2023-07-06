import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import smidgeLogo from "../assets/smidge-logo.png";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwtDecode from "jwt-decode";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleGoogleLogin = (resp: any) => {
    const credential = resp.credential;
    // send token to backend in Authorization header
    console.log(credential);
    axios
      .get("/api/auth/google", {
        headers: { Authorization: `Bearer ${credential}` },
      })
      .then((resp) => {
        // store in cookies that the user is logged in
        const token = resp.data;
        const decoded: any = jwtDecode(token);
        document.cookie = `token=${token}; expires=${new Date(
          decoded.exp * 1000
        ).toUTCString()} path=/`;
        // alert('success');
        // navigate('/admin');
        window.location.reload();
      })
      .catch((err) => {
        alert("You are not authorized to access this page");
        navigate("/");
      });
  };

  const routes = [
    { path: "/", name: "Dashboard" },
    { path: "/list", name: "List" },
    { path: "/about", name: "About" },
    { path: "/report", name: "Report" },
  ];
  // const elements = ["Dashboard", "List"];
  return (
    <nav className="nav-wrapper">
      <div className="smidge-logo">
        <Link to="/" className="brand-logo">
          <img src={smidgeLogo} alt="Smidge Logo" />
        </Link>
      </div>
      <div className="nav-links">
        {routes.map((route, index) =>
          route.name === "About" ? (
            <div
              className={`nav-link ${isDropdownOpen ? "active" : ""}`}
              onMouseEnter={handleDropdownToggle}
              onMouseLeave={handleDropdownToggle}
              key={index}
            >
              {route.name}
              {isDropdownOpen && (
                <div className="dropdown">
                  <div className="dropdown-links">
                    <Link to="/about-x" className="dropdown-link">
                      About Us
                    </Link>
                    <Link to="/about-y" className="dropdown-link">
                      About SMIDGE
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to={route.path}
              key={index}
              className={
                "nav-link " + (location.pathname === route.path ? "active" : "")
              }
            >
              {route.name}
            </Link>
          )
        )}
      </div>

      <div className="filler"></div>
      <div className="login">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            alert("err");
          }}
        />
      </div>
    </nav>
  );
}
