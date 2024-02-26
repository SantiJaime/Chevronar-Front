import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import CardComp from "../components/CardComp";
import clientAxios from "../utils/axiosClient";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [productos, setProductos] = useState([]);
  const [mostrarSpinner, setMostrarSpinner] = useState(true);
  const [verMas, setVerMas] = useState(false);

  const getProducts = async () => {
    const res = await clientAxios.get("/productos");
    setProductos(res.data.allProds);
    setMostrarSpinner(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleButton = () => setVerMas(!verMas);
  return (
    <>
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img
            className="d-block img-fluid carr"
            src="/slider1.jpg"
            alt="Slider 1"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block img-fluid carr"
            src="/slider2.jpg"
            alt="Slider 2"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block img-fluid carr"
            src="/slider3.jpg"
            alt="Slider 3"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block img-fluid carr"
            src="/slider4.jpg"
            alt="Slider 4"
          />
        </Carousel.Item>
      </Carousel>
      <Container fluid className="my-5 text-white">
        <Row className="justify-content-center">
          <Col lg={12} md={12} sm={12} className="mb-5 px-4">
            <h3>Chevronar - ¿Quiénes somos?</h3>
            <hr />
            {verMas ? (
              <p>
                Chevronar es una empresa de ventas de autopartes y repuestos de
                la marca Chevrolet con mas de 10 años de experiencia en el
                rubro. Ofrecemos una amplia gama de autopartes y repuestos
                originales y alternativos para diversos modelos y años de
                fabricación. Nuestro catálogo incluye piezas de motor, sistemas
                de frenos, suspensión, carrocería, iluminación, accesorios y
                mucho más. Trabajamos directamente con proveedores autorizados
                para garantizar la autenticidad y calidad de cada producto que
                ofrecemos. Ya sea que necesites una reparación básica o una
                actualización de rendimiento, tenemos las piezas adecuadas para
                satisfacer tus necesidades. En Chevronar, nos comprometemos a
                proporcionar productos de la más alta calidad a nuestros
                clientes. Cada autoparte y repuesto que vendemos está respaldado
                por nuestra garantía de calidad y cumple con los estándares
                rigurosos de la marca Chevrolet. Además, ofrecemos una política
                de devolución sin complicaciones para garantizar la satisfacción
                del cliente. Nuestro objetivo es brindar una experiencia de
                compra sin preocupaciones y asegurarnos de que obtengas las
                piezas adecuadas para tu vehículo.
              </p>
            ) : (
              <p>
                Chevronar es una empresa de ventas de autopartes y repuestos de
                la marca Chevrolet con mas de 10 años de experiencia en el
                rubro. Ofrecemos una amplia gama de autopartes y repuestos
                originales y alternativos...
              </p>
            )}
            <div className="d-flex flex-column align-items-center">
              <Button onClick={handleButton} className="widthButton mb-2" variant="light">
                {!verMas ? "Ver más" : "Ver menos"}
              </Button>
              <Link className="linkFooter" to={"/contact"}>
                ¿Necesitas comunicarte con nosotros? Visita nuestra sección de
                contacto <i className="bi bi-telephone"></i>
              </Link>
            </div>
          </Col>
          <Col lg={12} md={12} sm={12}>
            <h3>Productos destacados</h3>
            <hr />
            {mostrarSpinner ? (
              <div className="text-center my-5">
                <Spinner />
                <h5 className="mt-3">Cargando productos...</h5>
              </div>
            ) : (
              <Row>
                <CardComp type={"prodsDestacados"} productos={productos} />
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Homepage;
