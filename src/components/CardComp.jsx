import React from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CardComp = () => {
  return (
    <Col lg={2} md={4} sm={6} xs={12} className="my-2">
      <Card className="text-white fondo">
        <Card.Img variant="top" src="https://http2.mlstatic.com/D_NQ_NP_807624-MLA42628348277_072020-O.webp" alt="Imagen producto"/>
        <Card.Body>
          <Card.Title>Kit distribución Corsa</Card.Title>
          <hr />
          <Button variant="outline-light">Ver más</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardComp;
