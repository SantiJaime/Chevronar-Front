import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const FooterComp = () => {
  const role = JSON.parse(sessionStorage.getItem("role"));
  return (
    <footer className="py-3">
      <Container fluid>
        <Row className="justify-content-center">
          <Col lg={4} md={6} sm={12} className="margenLogo">
            <div className="flex justify-center">
              <Link to={"/"} className="img-fluid">
                <img
                  src="/logo2.png"
                  alt="Chevronar Logo"
                  width="280px"
                  className="img-fluid"
                />
              </Link>
            </div>
          </Col>
          <hr className="displayNone" />
          <Col
            lg={4}
            md={6}
            sm={12}
            className="d-flex align-items-center justify-content-center"
          >
            {role !== "admin" ? (
              <Link
                className="text-decoration-none text-white hover:bg-neutral-700 rounded-md p-2 transition"
                to={"/contact"}
              >
                <h5>Nuestras sucursales</h5>
                <ul className="m-0 p-0">
                  <li>Av. San Martín 112, Banda del Río Salí</li>
                  <li>Av. Colón 315, San Miguel de Tucumán</li>
                </ul>
              </Link>
            ) : (
              <div className="d-block">
                <h5>Nuestras sucursales</h5>
                <ul>
                  <li>Av. San Martín 112, Banda del Río Salí</li>
                  <li>Av. Colón 315, San Miguel de Tucumán</li>
                </ul>
              </div>
            )}
          </Col>
          <hr className="displayNone" />
          <Col
            lg={4}
            md={6}
            sm={12}
            className="d-flex align-items-center justify-content-center"
          >
            <div>
              <h5 className="text-center">Buscanos en nuestras redes</h5>
              <div className="d-flex justify-content-center">
                <a
                  className="mx-3"
                  href="https://www.facebook.com/chevronar.repuestosyaccesorios"
                  target="_blank"
                >
                  <i className="bi bi-facebook fs-1 fb"></i>
                </a>
                <a
                  className="mx-3"
                  href="https://wa.me/message/AQZNUQA6TEJVJ1"
                  target="_blank"
                >
                  <i className="bi bi-whatsapp fs-1 wp"></i>
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComp;
