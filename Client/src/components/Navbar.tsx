import { Link, useLocation } from "react-router-dom";
import smidgeLogo from "../assets/smidge-logo.png";

export default function Navbar() {
  const location = useLocation();

  const routes = [
    { path: "/", name: "Dashboard" },
    { path: "/list", name: "List" },
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
        {routes.map((route) => (
          <Link
            to={route.path}
            className={
              "nav-link " + (location.pathname === route.path ? "active" : "")
            }
          >
            {route.name}
          </Link>
        ))}
      </div>
      <div className="filler"></div>
    </nav>
  );
}
