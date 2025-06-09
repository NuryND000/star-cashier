import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-3 mt-4">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0">&copy; {currentYear} KASIRQU </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            {/* <p className="mb-0">
              Dibuat oleh <a href="#" className="">Tim Developer</a>
            </p> */}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
