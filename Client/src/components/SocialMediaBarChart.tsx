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
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

type SocialMedia = {
  socialMedia: string;
  count: number;
};

const SocialMediaBarChart = () => {
  // const data = [
  //   { socialMedia: "YouTube", count: 10 },
  //   { socialMedia: "Instagram", count: 20 },
  //   { socialMedia: "Tiktok", count: 30 },
  //   { socialMedia: "Twitter", count: 40 },
  //   { socialMedia: "Facebook", count: 30 },
  // ];

  const [socialMediaBreakdown, setSocialMediaBreakdown] = useState<
    SocialMedia[]
  >([]);

  useEffect(() => {
    const getData = async () => {
      let breakdown = (await axios.get("/api/resource/socialmedia")).data;

      //Todo: remove the following:
      breakdown = breakdown.map((el: SocialMedia) => {
        return { ...el, count: el.count + 5 };
      });

      setSocialMediaBreakdown(breakdown);
    };
    getData();
  }, []);

  // const colors = ["#EEf1E6", "#799FCB", "#FEC9C9", "#F9665E", "#95B4CC"];
  const colors = ["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#073b4c"];

  if (socialMediaBreakdown.length == 0) {
    return <></>;
  }

  console.log(socialMediaBreakdown);
  return (
    <Row>
      <Col md={12}>
        <div
          className="rounded-component"
          style={{ height: "100%", maxHeight: "500px" }}
        >
          <div className="category-breakdown">Social Media Source</div>
          <div className="category-breakdownsub">
            Illustrating the distribution of records by platform
          </div>
          <ResponsiveContainer width={"100%"} height="85%">
            <BarChart
              data={socialMediaBreakdown}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              height={300}
              width={500}
              //disable legend
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="socialMedia" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count">
                {socialMediaBreakdown.map((entry, index) => (
                  <Cell
                    key={entry.socialMedia}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Col>
    </Row>
  );
};

export default SocialMediaBarChart;
