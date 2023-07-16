import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import smidgeLogo from "../assets/smidge-logo.png";

export default function NavbarMobile() {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const routes = [
    { path: "/", name: "DASHBOARD" },
    { path: "/list", name: "LIST" },
    { path: "/about-us", name: "ABOUT THIS PLATFROM" },
    { path: "/about-smidge", name: "ABOUT SMIDGE" },
    { path: "/report", name: "REPORT" },
  ];

  return (
    <div className="nav-mobile">
      <Toolbar style={{ display: "flex" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
        <div className="filler" style={{ flex: 1 }}></div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/" className="brand-logo" style={{ marginLeft: "auto" }}>
            <img width="120px" src={smidgeLogo} alt="Smidge Logo" />
          </Link>
        </div>
      </Toolbar>

      <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle}>
        <div className="drawer-content">
          <List>
            {routes.map((route, index) => (
              <ListItem
                button
                component={Link}
                to={route.path}
                key={index}
                selected={location.pathname === route.path}
                onClick={handleDrawerToggle}
              >
                <ListItemText primary={route.name} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
}
