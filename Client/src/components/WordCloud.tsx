import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactWordcloud from "react-wordcloud";

export default function WordCloud() {
  const [words, setWords] = useState<any[]>([]);

  const word_array = [
    "extremism",
    "radicalism",
    "hate",
    "violence",
    "terrorism",
    "intolerance",
    "prejudice",
    "discrimination",
    "bigotry",
    "xenophobia",
    "homophobia",
    "islamophobia",
    "anti-Semitism",
    "white supremacy",
    "hate speech",
    "misogyny",
    "sexism",
    "patriarchy",
    "objectification",
    "gender bias",
    "harassment",
    "rape culture",
    "racism",
    "racial profiling",
    "systemic racism",
    "racial injustice",
    "white privilege",
    "microaggressions",
    "colorism",
    "stereotypes",
    "apartheid",
  ];

  const mockData = word_array.map((word, index) => {
    return {
      text: word,
      //uniform distribution

      value: Math.floor(Math.random() * 50),
    };
  });

  console.log(mockData);

  const options: any = {
    // rotations: 2,
    // rotationAngles: [-90, 0],
    rotations: 1,
    rotationAngles: [0],
    fontFamily: "verdana",
    //disable hover

    // colors: [
    //   "#333333",
    //   "#CCCCCC",
    //   "#990000",
    //   "#FF6666",
    //   "#000099",
    //   "#6699FF",
    //   "#006600",
    //   "#66FF66",
    //   "#660066",
    //   "#CC66CC",
    // ],
  };
  useEffect(() => {
    axios
      .get("/api/resource/wordcloud")
      .then((res) => {
        const data = res.data.map((word: any) => {
          return { text: word.word, value: word.frequency };
        });
        setWords(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div
        style={{
          maxWidth: 500,
          background: "#fff",
          borderRadius: "15px",
          margin: 25,
          border: "1px solid #ddd",
          padding: 25,
          // boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            width: 500,
            height: 250,
          }}
        >
          <ReactWordcloud words={mockData} options={options} />
        </div>
      </div>
    </>
  );
}
