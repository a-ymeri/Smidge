import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import smidgeLogo from "../assets/smidge-logo.png";

export default function Navbar() {
  const location = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
        {routes.map((route) =>
          route.name === "About" ? (
            <div
              className={`nav-link ${isDropdownOpen ? "active" : ""}`}
              onMouseEnter={handleDropdownToggle}
              onMouseLeave={handleDropdownToggle}
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
    </nav>
  );
}
