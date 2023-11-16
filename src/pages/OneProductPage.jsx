import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clientAxios from "../utils/axiosClient";
import { Button, Col, Container, Row } from "react-bootstrap";
import Swal from "sweetalert2";

const OneProductPage = () => {
  const params = useParams();

  const token = JSON.parse(sessionStorage.getItem("token"));
  const idUser = JSON.parse(sessionStorage.getItem("idUser"));

  const [prod, setProd] = useState({});

  const getProduct = async () => {
    const res = await clientAxios.get(`/productos/${params.id}`);
    setProd(res.data.oneProd);
  };


  const addCart = async (idProd) => {
    try {
      const resUser = await fetch(
        `${import.meta.env.VITE_URL_DEPLOY}/usuarios/${idUser}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseUser = await resUser.json();
      const { idCart } = responseUser.oneUser;

      const resCart = await fetch(
        `${import.meta.env.VITE_URL_DEPLOY}/carrito/${idCart}/${idProd}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseCart = await resCart.json();

      if (responseCart.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Producto agregado al carrito",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "¡Al parecer hubo un error!",
          text: responseCart.msg,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "¡Al parecer hubo un error!",
        text: error,
      });
    }
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
          {token ? (
            <h4>${prod.precio}</h4>
          ) : (
            <Link className="linkFooter fs-5" to={"/login"}>
              Debes iniciar sesión para ver los precios
            </Link>
          )}
          <hr />
          <p>{prod.descripcion}</p>
          <hr />
          <div className="d-flex justify-content-between">
            <a href="" className="btn btn-outline-light fs-5">
              ¿Tienes dudas? <i className="bi bi-whatsapp"></i>
            </a>
            {token && (
              <Button variant="outline-light" className="fs-5" onClick={() => addCart(prod._id)}>
                <i className="bi bi-cart-plus-fill"></i> Añadir al carrito
              </Button>
            )}
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
