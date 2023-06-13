import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactWordcloud from "react-wordcloud";
import WordCloud from "./components/WordCloud";
import Map from "./components/Map";
import CategoryCount from "./components/CategoryCount";
import SocialMediaBarChart from "./components/Barchart";

import { Row, Col } from "react-bootstrap";

function App() {
  //change axios config base url
  return (
    <div
      style={{
        background: "#f5fafa",
        padding: 25,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Row style={{ width: "85%", margin: "auto" }}>
          <Col md={6} sm={12}>
            <CategoryCount />
            <br></br>
            <Map />
          </Col>
          <Col md={6} sm={12}>
            <WordCloud />
            <br></br>
            <SocialMediaBarChart />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
