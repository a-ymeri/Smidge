/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from "axios";
// import { useEffect, useState } from "react";
import ReactWordcloud from "react-wordcloud";

export default function WordCloud() {
  // const [words, setWords] = useState<any[]>([]);

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

  const mockData = word_array.map((word) => {
    return {
      text: word,
      value: Math.floor(Math.random() * 50),
    };
  });

  const options: any = {
    // rotations: 2,
    // rotationAngles: [-90, 0],
    rotations: 1,
    rotationAngles: [0],
    fontFamily: "Inter",
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
  // useEffect(() => {
  //   axios
  //     .get("/api/resource/wordcloud")
  //     .then((res) => {
  //       // const data = res.data.map((word: any) => {
  //       //   return { text: word.word, value: word.frequency };
  //       // });
  //       // setWords(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <>
      <div className="rounded-component">
        <div
          style={{
            width: "100%",
            height: 340,
          }}
        >
          <div className="category-breakdown">Wordcloud</div>
          <div
            className="category-breakdownsub"
            style={{ marginBottom: "-10px" }}
          >
            Exploring the semantic landscape of dominant vocabulary
          </div>
          <ReactWordcloud words={mockData} options={options} />
        </div>
      </div>
    </>
  );
}
