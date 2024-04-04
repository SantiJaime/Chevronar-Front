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
              <Link to={"/"}>
                <img
                  src="/logo2_preview_rev_1.webp"
                  alt="Chevronar Logo"
                  className="img-fluid"
                  loading="lazy"
                  width={"320px"}
                  height={"auto"}
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
                className="text-decoration-none text-white hover:bg-neutral-700 rounded-md p-2 transition mb-2"
                to={"/contact"}
              >
                <p className="font-bold fs-5 mb-2">Nuestras sucursales</p>
                <ul className="m-0 p-0">
                  <li>Av. San Martín 112, Banda del Río Salí</li>
                  <li>Av. Colón 315, San Miguel de Tucumán</li>
                </ul>
              </Link>
            ) : (
              <div className="d-block">
                <p className="font-bold fs-5">Nuestras sucursales</p>
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
              <p className="text-center font-bold fs-5 mb-2">Buscanos en nuestras redes</p>
              <div className="d-flex justify-content-center">
                <a
                  className="mx-3"
                  href="https://www.facebook.com/chevronar.repuestosyaccesorios"
                  target="_blank"
                  aria-label="Visita nuestra página de Facebook"
                >
                  <i className="bi bi-facebook fs-1 fb"></i>
                </a>
                <a
                  className="mx-3"
                  href="https://wa.me/message/AQZNUQA6TEJVJ1"
                  target="_blank"
                  aria-label="Envíanos un mensaje a través de nuestro Whatsapp"
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
