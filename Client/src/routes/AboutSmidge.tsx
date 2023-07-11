import React from "react";
import Banner from "../components/Banner";
import { Row, Col } from "react-bootstrap";
import icon1 from "../assets/about-us-icon-1.svg";
import icon2 from "../assets/about-us-icon-2.svg";
import icon3 from "../assets/about-us-icon-3.svg";
import icon4 from "../assets/about-us-icon-4.svg";

export default function AboutSmidge() {
  return (
    <>
      <Banner title="ABOUT SMIDGE" description="" />
      <div className="about-smidge about-section">
        <div className="about-smidge-intro">
          <span className="inline-smidge">SMIDGE</span> will provide
          evidence-based content, tools and resources to counter extremist
          narratives from various perspectives, with a focus on middle-aged
          individuals and their susceptibility to online radicalization. Through
          this effort, we aim to promote greater understanding and provide
          effective countermeasures and education.
        </div>

        <div className="about-regular-text">
          When we think of the impact of social media on extremism, the focus is
          often on young people. However, research has shown that middle-aged
          adults, between 45 and 65 years old, are also susceptible to extremist
          narratives, especially those related to conspiracy theories and
          misinformation. Despite this, the impact of their exposure to
          extremist content is often overlooked, even though it can have
          significant consequences on political discourse, democratic processes,
          and institutions.
        </div>
        <div className="about-regular-text">
          The SMIDGE project aims to address this gap by exploring the impact of
          extremist narratives on the middle-aged population. The project
          consists of four main phases:
        </div>
        <Row className="about-section about-list">
          <Col md={3} lg={3} className="about-list-item">
            <img src={icon1} alt="icon" className="aboutIcon" />

            <span>
              Better <strong>understanding</strong> the online extremist
              narrative landscape and content engagement among individuals aged
              45-65, through a multi-disciplinary approach that involves
              literature review and social network analysis.
            </span>
          </Col>
          <Col md={3} lg={3} className="about-list-item">
            <img src={icon2} alt="icon" className="aboutIcon" />

            <span>
              <strong>Analysing</strong> various forms of extremist discourses
              and narratives across Europe, using social network analysis,
              textual and content analysis, and surveys, focus groups, and
              interviews in six countries (the UK, Italy, Belgium, Denmark,
              Kosovo, and Cyprus).
            </span>
          </Col>
          <Col md={3} lg={3} className="about-list-item">
            <img src={icon3} alt="icon" className="aboutIcon" />
            <span>
              <strong>Developing</strong> counter-narratives and educational
              resources to promote reflexivity and provide evidence-based tools
              and training for journalists and security professionals, who play
              a crucial role in addressing fake news and disinformation.
            </span>
          </Col>
          <Col md={3} lg={3} className="about-list-item">
            <img src={icon4} alt="icon" className="aboutIcon" />
            <span>
              <strong>Providing</strong> guidelines & recommendations for policy
              and decision-makers based on the project findings, and present
              these findings to security professionals, policy makers, and
              journalists through roundtables and conference.
            </span>
          </Col>
        </Row>
        <Row className="about-section about-smidge">
          <div className="about-regular-text">
            <span>
              <strong>SMIDGE</strong> aims to gain a comprehensive understanding
              of the factors contributing to the rise of extremist narratives
              among the middle-aged individuals in Europe and their impact on
              mainstream worldviews, discourses, and policies. To achieve this,
              the project will take a{" "}
              <strong>multi-disciplinary approach</strong>, incorporating legal,
              psychological, technical, sociological, political, and
              anthropological perspectives.
            </span>
          </div>
          <div className="about-regular-text">
            <span>
              One of SMIDGE's primary objectives is to produce and disseminate
              <strong> alternative</strong> narratives in the form of
              counter-videos, memes, and other micro-content. To ensure that
              this content is effective, the project will employ an innovative
              approach to its creation, drawing on previous research and
              engaging in new empirical work. The goal is to promote reflexivity
              among target stakeholders, including those who are vulnerable to
              extremist material and those tasked with addressing the issues.
            </span>
          </div>
          <div className="about-regular-text">
            <span>
              In a new,{" "}
              <strong>responsible research and innovation (RRI)</strong> based
              methodological approach, the project will focus on middle-aged
              people and involve them in a co-creative process to develop
              counter-content. By collaborating with stakeholders during focus
              group exercises, SMIDGE will gain insights into the current and
              evolving discourse among those who may be vulnerable to extremist
              messaging but are not currently viewing it.
            </span>
          </div>
          <div className="about-regular-text">
            <span>
              As a core conceptual approach, SMIDGE adopts the theory of RRI to
              ensure adherence to the highest{" "}
              <strong>ethical and quality standards.</strong> The resulting
              counter-content, educational tools, and policy recommendations
              will promote first and second-order reflexivity and contribute to
              the fight against extremist narratives.
            </span>
          </div>
          <div className="about-regular-text">
            <span>
              The outputs from SMIDGE will provide{" "}
              <strong>evidence-based content, tools and resources</strong> that
              will assist in countering extremist narratives from various
              perspectives. This will provide a better understanding of the
              specificities and characteristics of middle-aged individuals and
              their vulnerability to online extremism, as well as
              counter-measures and education.
            </span>
          </div>
          <div className="about-regular-text">
            <span>
              An online, open database of characteristics will support future
              researchers and counter-content producers. By providing this
              resource, SMIDGE aims to <strong>increase awareness</strong> and
              understanding of the factors contributing to the rise of extremist
              narratives, and promote the development of effective
              counter-measures.
            </span>
          </div>
        </Row>
      </div>
    </>
  );
}
