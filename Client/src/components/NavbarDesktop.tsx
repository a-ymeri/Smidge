import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import smidgeLogo from "../assets/smidge-logo.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

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
    <nav className="nav-wrapper nav-desktop">
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
                    <Link to="/about-us" className="dropdown-link">
                      About this platform
                    </Link>
                    <Link to="/about-smidge" className="dropdown-link">
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
    </nav>
  );
}
