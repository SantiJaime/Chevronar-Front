import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clientAxios from "../utils/axiosClient";
import { Button, Col, Container, Row } from "react-bootstrap";

const OneProductPage = () => {
  const params = useParams();

  const [prod, setProd] = useState({});

  const getProduct = async () => {
    const res = await clientAxios.get(`/productos/${params.id}`);
    setProd(res.data.oneProd);
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <Container className="my-5 text-white">
      <Row>
        <Col
          lg={4}
          md={12}
          sm={12}
          className="d-flex justify-content-center my-3"
        >
          <img
            src={prod.imagen}
            className="img-fluid rounded-4"
            alt={prod.nombre}
          />
        </Col>
        <Col lg={8} md={12} sm={12} className="my-3">
          <h3>{prod.nombre}</h3>
          <hr />
          <h4>${prod.precio}</h4>
          <hr />
          <p>{prod.descripcion}</p>
          <hr />
          <div className="d-flex justify-content-between">
            <a href="" className="btn btn-outline-light fs-5">
              ¿Tienes dudas? <i className="bi bi-whatsapp"></i>
            </a>
            <Button variant="outline-light" className="fs-5">
              <i className="bi bi-cart-plus-fill me-2"></i> Añadir al carrito
            </Button>
            {/* {token ? (
              <button
                onClick={() => addCart(prod._id)}
                className="btn botones fs-5"
              >
                <i className="bi bi-cart-plus-fill me-2"></i>
                Agregar al carrito
              </button>
            ) : (
              <Link className="btn botones fs-5" to={"/login"}>
                <i className="bi bi-cart-plus-fill me-2"></i>
                Agregar al carrito
              </Link>
            )} */}
          </div>
        </Col>
      </Row>
      <hr />
      <div className="text-center">
        <Link className="btn btn-light fs-5" to={"/products"}>
          <i className="bi bi-arrow-left-circle"></i> Volver a productos
        </Link>
      </div>
    </Container>
  );
};

export default OneProductPage;
