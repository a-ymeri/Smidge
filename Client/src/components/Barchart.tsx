import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

const SocialMediaBarChart = () => {
  const data = [
    { socialMedia: "TikTok", count: 10 },
    { socialMedia: "Facebook", count: 20 },
    { socialMedia: "Instagram", count: 30 },
    { socialMedia: "YouTube", count: 40 },
    { socialMedia: "Twitter", count: 30 },
  ];

  const colors = ["#000000", "#1877F2", "#E4405F", "#CD201F", "#1DA1F2"];
  return (
    <div
      style={{
        background: "#fff",
        padding: 25,
        // margin: 25,
        borderRadius: "20px",
        border: "1px solid #ddd",
        margin: "auto",
        width: "100%",
        height: "100%",
        minHeight: "400px",
        alignContent: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <ResponsiveContainer width={"80%"}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          height={300}
          width={500}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="socialMedia" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count">
            {data.map((entry, index) => (
              <Cell
                key={entry.socialMedia}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SocialMediaBarChart;
