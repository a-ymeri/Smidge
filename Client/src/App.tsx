import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactWordcloud from "react-wordcloud";
import WordCloud from "./components/WordCloud";
import Map from "./components/Map";
function App() {
  //change axios config base url
  return (
    <div
      style={{
        //rgb
        background: "#f5fafa",
        width: "100%",
        padding: 25,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <WordCloud />
      <Map />
    </div>
  );
}

export default App;
