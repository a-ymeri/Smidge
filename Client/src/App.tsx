import "./assets/App.css";
import WordCloud from "./components/WordCloud";
import Map from "./components/Map";
import CategoryCount from "./components/CategoryCount";
import SocialMediaBarChart from "./components/SocialMediaBarChart";
import DetailedDataButton from "./components/DetailedDataButton";

import { Row, Col } from "react-bootstrap";
import List from "./routes/List";
import Banner from "./components/Banner";

function App() {
  //change axios config base url
  return (
    <>
      <Banner
        title="SMIDGE"
        description="Database with the main characteristics of the existing videos that promote extremist narratives online"
      />
      <div
        className="dashboard"
        style={{
          background: "#f5fafa",
          display: "flex",
          flexDirection: "column",
          paddingTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Row className="dashboard-row">
            <Col md={6} sm={12} className="count-and-map">
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
          <Row className="dashboard-row">
            <Col md={12} sm={12}>
              <List
                key="homepage"
                columns={[
                  {
                    field: "title",
                    width: 170,
                  },
                  {
                    field: "description",
                    width: 450,
                  },
                  {
                    field: "category",
                    width: 250,
                  },
                  {
                    field: "link",
                    width: 220,
                  },
                ]}
              />
            </Col>
          </Row>
          <Row
            style={{
              width: "85%",
              margin: "auto",
              // marginTop: "-65px",
              justifyContent: "flex-end",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <Col md={3} sm={3}>
              <DetailedDataButton />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default App;
