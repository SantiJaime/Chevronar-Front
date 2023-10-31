import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { Col, Container, Row } from "react-bootstrap";
import CardComp from "../components/CardComp";

const Homepage = () => {
  return (
    <>
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img
            className="d-block img-fluid carr"
            src="/slider-1.jpg"
            alt="Slider 1"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block img-fluid carr"
            src="/slider-2.jpg"
            alt="Slider 2"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block img-fluid carr"
            src="/slider-3.jpg"
            alt="Slider 3"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block img-fluid carr"
            src="/slider-4.jpg"
            alt="Slider 4"
          />
        </Carousel.Item>
      </Carousel>
      <Container fluid className="mb-5 text-white">
        <hr className="text-white" />
        <Row>
          <Col lg={12} md={12} sm={12}>
            <h3>Productos destacados</h3>
            <Row>
              <CardComp />
              <CardComp />
              <CardComp />
              <CardComp />
              <CardComp />
              <CardComp />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Homepage;
