import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { IconButton } from "@mui/material";
import euFlag from "../assets/euFlag.png";

import { Container, Row, Col } from "react-bootstrap";
export default function Footer() {
  // const elements = ["Dashboard", "List"];
  return (
    <Container fluid>
      <Row className="footer">
        <Col lg={4} md={6} sm={12} className="footer-left">
          <Row className="footer-funded-by">
            <Col
              className="eu-flag"
              style={{ display: "flex", justifyContent: "center" }}
              lg={4}
              md={12}
              sm={12}
            >
              <img src={euFlag} alt="EU Flag" />
            </Col>
            <Col lg={8} md={12} sm={12}>
              <p>
                Grant Agreement Number 101095290.
                Funded by the European Union.
              </p>
            </Col>
          </Row>

          <div className="footer-contents">
            Views and opinions expressed
            are however those of the author(s) only and do not necessarily
            reflect those of the European Union or European Research
            Executive Agency (REA). Neither the European Union nor the
            granting authority can be held responsible for them.
            UK participant in Horizon Europe Project SMIDGE is supported
            by UKRI grant numbers 10056282 (De Montfort University).
          </div>
        </Col>
        <Col lg={4} md={6} sm={12} className="footer-right">
          <div className="footer-connect">Connect with us</div>
          <span>
            <a
              href="mailto:info@smidgeproject.eu"
              className="mail-link"
              style={{
                wordBreak: "break-word",
              }}
            >
              info@smidgeproject.eu
            </a>
          </span>
          <div className="footer-socials">
            <IconButton
              href="https://www.linkedin.com/company/smidge-project/"
              target="_blank"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              href="https://twitter.com/SmidgeProject"
              target="_blank"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              href="https://www.youtube.com/channel/UCI78TNb2fvPgJxsM-EL5WgA"
              target="_blank"
            >
              <YouTubeIcon />
            </IconButton>
          </div>
        </Col>
      </Row>
      <Row className="footer3">
        <div className="footer-copyright">© 2023 Smidge Project</div>
      </Row>
    </Container>
  );
}
