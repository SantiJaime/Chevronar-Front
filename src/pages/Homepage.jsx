import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Col, Container, Row } from "react-bootstrap";
import CardComp from "../components/CardComp";
import clientAxios from "../utils/axiosClient";

const Homepage = () => {
  const [productos, setProductos] = useState([]);

  const getProducts = async () => {
    const res = await clientAxios.get("/productos");
    setProductos(res.data.allProds);
  };

  useEffect(() => {
    getProducts();
  }, []);
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
      <Container fluid className="my-5 text-white">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <h3>Productos destacados</h3>
            <hr />
            <Row>
              <CardComp type={"prodsDestacados"} productos={productos} />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Homepage;
