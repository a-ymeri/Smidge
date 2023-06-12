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
        <Row style={{ width: "100%" }}>
          <Col md={6} sm={12}>
            <CategoryCount />
          </Col>
          <Col md={6} sm={12}>
            <WordCloud />
          </Col>
          <Col md={6} sm={12}>
            <SocialMediaBarChart />
          </Col>
          <Col md={6} sm={12}>
            <Map />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
