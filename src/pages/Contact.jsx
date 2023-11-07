import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const Contact = () => {
  const [toggle, setToggle] = useState("banda");

  const toggleMap = (map) => setToggle(map);
  return (
    <Container className="my-5">
      <Row className="justify-content-around">
        <Col className="my-1" lg={6} md={12} sm={12}>
          <div className="text-white fondo p-3 rounded-4">
            <h3>Contactanos</h3>
            <hr />
            <div className="text-center">
              <p>Para consultas, a través de MD de Facebook o por Whatsapp:</p>
              <a href="https://wa.me/message/AQZNUQA6TEJVJ1" target="_blank">
                <i className="bi bi-whatsapp fs-1 wp"></i>
              </a>
              <p>O</p>
              <h5>
                Nuestro número telefónico: 0381-4265156 (BRS) | 0381-4556051
                (SMT)
              </h5>
              <hr />
              <h5 className="text-decoration-underline">
                Visitanos en nuestras sucursales
              </h5>
              <ul>
                <li>Av. San Martín 112, Banda del Río Salí</li>
                <li>Av. Colón 315, San Miguel de Tucumán</li>
              </ul>
              <hr />
              <h5 className="text-decoration-underline">Nuestros horarios</h5>
              <li>Lunes a viernes: 08:30 a 13 | 16:00 a 20:00</li>
              <li>Sábados: 08:30 a 13:00</li>
            </div>
          </div>
        </Col>
        <Col lg={6} md={12} sm={12} className="my-1">
          <div className="text-white fondo p-3 rounded-4">
            <h3>Nuestras sucursales</h3>
            <hr />
            <iframe
              src={
                toggle === "banda"
                  ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113985.37692893641!2d-65.32219068497959!3d-26.77489829649691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9422594a9d90df7d%3A0xf2094ed3c2470803!2sChevronar!5e0!3m2!1sen!2sar!4v1698704810363!5m2!1sen!2sar"
                  : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113985.37692893641!2d-65.32219068497959!3d-26.77489829649691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c60deac35ab%3A0x9ad0f9e32a0723f8!2sChevronar!5e0!3m2!1sen!2sar!4v1698704838115!5m2!1sen!2sar"
              }
              className="rounded-4 w-100"
              height="340px"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <hr />
            <div className="d-flex justify-content-center">
              <Button
                variant="outline-light"
                className={toggle === "banda" ? "mx-1 active" : "mx-1"}
                onClick={() => toggleMap("banda")}
              >
                Banda del Río Salí
              </Button>
              <Button
                variant="outline-light"
                className={toggle === "capital" ? "mx-1 active" : "mx-1"}
                onClick={() => toggleMap("capital")}
              >
                San Miguel de Tucumán
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
