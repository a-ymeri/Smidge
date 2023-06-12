import React from "react";
import CountUp from "react-countup";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import ChurchOutlinedIcon from "@mui/icons-material/ChurchOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";

const CategoryCount: React.FC = () => {
  return (
    <div className="rounded-component" style={{ width: "100%" }}>
      <div className="category-breakdown">Category breakdown:</div>
      <div className="square-components">
        <div
          className="square-component"
          style={{ backgroundColor: "#ffe2e6" }}
        >
          <div
            className="icon-background"
            style={{ backgroundColor: "#fa5a7c", marginLeft: "-70px", marginBottom: "25px" }}
          >
            <GavelOutlinedIcon className="icon" sx={{ color: "white" }} />
          </div>
          <div className="content">
            <div className="count-number">
              <CountUp end={23} duration={2.5} separator="," enableScrollSpy />
            </div>
            <div className="textCategory">Far-Right</div>
          </div>
        </div>
        <div
          className="square-component"
          style={{ backgroundColor: "#fff4de" }}
        >
          <div className="icon-background"
           style={{ backgroundColor: "#ff947a", marginLeft: "-70px", marginBottom: "25px" }}
          >
            <ChurchOutlinedIcon className="icon" sx={{ color: "white" }}/>
          </div>
          <div className="content">
            <div className="count-number">
              <CountUp end={15} duration={3} separator="," enableScrollSpy />
            </div>
            <div className="textCategory">Religious</div>
          </div>
        </div>
        <div
          className="square-component"
          style={{ backgroundColor: "#dcfce7" }}
        >
          <div className="icon-background"
           style={{ backgroundColor: "#3cd856", marginLeft: "-70px", marginBottom: "25px" }}>
            <VisibilityOffOutlinedIcon className="icon" sx={{ color: "white" }}/>
          </div>
          <div className="content">
            <div className="count-number">
              <CountUp end={44} duration={3.5} separator="," enableScrollSpy />
            </div>
            <div className="textCategory">Conspiracy</div>
          </div>
        </div>
        <div
          className="square-component"
          style={{ backgroundColor: "#f4e8ff" }}
        >
          <div className="icon-background"
           style={{ backgroundColor: "#bf83ff", marginLeft: "-70px", marginBottom: "25px" }}>
            <VaccinesOutlinedIcon className="icon" sx={{ color: "white" }}/>
          </div>
          <div className="content">
            <div className="count-number">
              <CountUp end={9} duration={2} separator="," enableScrollSpy />
            </div>
            <div className="textCategory">Anti-Vax</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCount;
