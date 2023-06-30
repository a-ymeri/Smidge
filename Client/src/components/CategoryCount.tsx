import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import ChurchOutlinedIcon from "@mui/icons-material/ChurchOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import axios from "axios";

const CategoryCount: React.FC = () => {
  const [categoryBreakdown, setCategoryBreakdown] = useState({
    farRight: 0,
    religious: 0,
    conspiracy: 0,
    antivax: 0,
  });

  useEffect(() => {
    const getData = async () => {
      const breakdown = (await axios.get("/api/resource/categories")).data;
      const data = {
        farRight: breakdown["Far-right"] || 0,
        antivax: breakdown["Anti-Vax"] || 0,
        conspiracy: breakdown["Conspiracy"] || 0,
        religious: breakdown["Religious"] || 0,
      };

      //TODO: REMOvE, added for testing only
      data.farRight += 10;
      data.antivax += 10;
      data.conspiracy += 10;
      data.religious += 10;

      setCategoryBreakdown(data);
    };
    getData();
  }, []);

  return (
    // <Row>
    <div className="rounded-component" style={{ width: "100%" }}>
      <div className="category-breakdown">Category breakdown</div>
      <div className="category-breakdownsub">
        A statistical overview of records categorized by themes
      </div>
      <div className="square-components">
        {/* <Col md={3} sm={6}> */}
        <div
          className="square-component"
          style={{ backgroundColor: "#ffe2e6" }}
        >
          <div
            className="icon-background"
            style={{
              backgroundColor: "#fa5a7c",
              marginLeft: "-70px",
              marginBottom: "25px",
            }}
          >
            <GavelOutlinedIcon className="icon" sx={{ color: "white" }} />
          </div>
          <div className="content">
            <div className="count-number">
              <CountUp
                end={categoryBreakdown.farRight}
                duration={2.5}
                separator=","
                enableScrollSpy
              />
            </div>
            <div className="textCategory">Far-Right</div>
          </div>
        </div>
        {/* </Col> */}
        {/* <Col md={3} sm={6}> */}
        <div
          className="square-component"
          style={{ backgroundColor: "#fff4de" }}
        >
          <div
            className="icon-background"
            style={{
              backgroundColor: "#ff947a",
              marginLeft: "-70px",
              marginBottom: "25px",
            }}
          >
            <ChurchOutlinedIcon className="icon" sx={{ color: "white" }} />
          </div>
          <div className="content">
            <div className="count-number">
              <CountUp
                end={categoryBreakdown.religious}
                duration={3}
                separator=","
                enableScrollSpy
              />
            </div>
            <div className="textCategory">Religious</div>
          </div>
        </div>
        {/* </Col> */}
        {/* <Col md={3} sm={6}> */}
        <div
          className="square-component"
          style={{ backgroundColor: "#dcfce7" }}
        >
          <div
            className="icon-background"
            style={{
              backgroundColor: "#3cd856",
              marginLeft: "-70px",
              marginBottom: "25px",
            }}
          >
            <VisibilityOffOutlinedIcon
              className="icon"
              sx={{ color: "white" }}
            />
          </div>
          <div className="content">
            <div className="count-number">
              <CountUp
                end={categoryBreakdown.conspiracy}
                duration={3.5}
                separator=","
                enableScrollSpy
              />
            </div>
            <div className="textCategory">Conspiracy</div>
          </div>
        </div>
        {/* </Col> */}
        {/* <Col md={3} sm={6}> */}
        <div
          className="square-component"
          style={{ backgroundColor: "#f4e8ff" }}
        >
          <div
            className="icon-background"
            style={{
              backgroundColor: "#bf83ff",
              marginLeft: "-70px",
              marginBottom: "25px",
            }}
          >
            <VaccinesOutlinedIcon className="icon" sx={{ color: "white" }} />
          </div>
          <div className="content">
            <div className="count-number">
              <CountUp
                end={categoryBreakdown.antivax}
                duration={2}
                separator=","
                enableScrollSpy
              />
            </div>
            <div className="textCategory">Anti-Vax</div>
          </div>
        </div>
        {/* </Col> */}
      </div>
    </div>
    // </Row>
  );
};

export default CategoryCount;
