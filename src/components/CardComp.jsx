import React from "react";
import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const CardComp = ({ type, productos }) => {
  return (
    <>
      {type === "prod" ? (
        productos.length > 0 ? (
          productos.map((prod) => (
            <Col lg={3} md={4} sm={6} xs={12} key={prod._id} className="my-2">
              <Card className="text-white fondo">
                <Card.Img
                  variant="top"
                  src={prod.imagen}
                  alt={`Chevronar | ${prod.nombre}`}
                  className="img-fluid"
                />
                <Card.Body>
                  <Card.Title>{prod.nombre}</Card.Title>
                  <Card.Title>${prod.precio}</Card.Title>

                  <hr />
                  <Link
                    className="btn btn-light w-100"
                    to={`/product/${prod._id}`}
                  >
                    Ver más
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <h3 className="text-center mt-3">
            No existen resultados para su búsqueda
          </h3>
        )
      ) : type === "prodsDestacados" ? (
        productos.map(
          (prod) =>
            prod.categoria === "Destacado" && (
              <Col lg={3} md={6} sm={12} key={prod._id} className="my-2">
                <Card className="text-white fondo sombra">
                  <Card.Img
                    variant="top"
                    src={prod.imagen}
                    alt={`Chevronar | ${prod.nombre}`}
                    className="img-fluid"
                  />
                  <Card.Body>
                    <Card.Title>{prod.nombre}</Card.Title>
                    <Card.Title>${prod.precio}</Card.Title>
                    <hr />
                    <Link
                      className="btn btn-light w-100"
                      to={`/product/${prod._id}`}
                    >
                      Ver más
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            )
        )
      ) : (
        ""
      )}
    </>
  );
};

export default CardComp;
