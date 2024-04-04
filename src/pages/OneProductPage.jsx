import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import clientAxios from "../utils/axiosClient";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

const OneProductPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const token = JSON.parse(sessionStorage.getItem("token"));
  const role = JSON.parse(sessionStorage.getItem("role"));
  const idUser = JSON.parse(sessionStorage.getItem("idUser"));

  const [prod, setProd] = useState({});
  const [desc, setDesc] = useState([]);
  const [mostrarSpinner, setMostrarSpinner] = useState(true);

  const getProduct = async () => {
    try {
      const res = await clientAxios.get(`/productos/${params.id}`);
      setProd(res.data.oneProd);
      setDesc(res.data.oneProd.descripcion.split("| "));
      setMostrarSpinner(false);
    } catch (error) {
      navigate("/*");
      Swal.fire({
        icon: "error",
        title: "¡Al parecer hubo un error",
        text: error.response.data.msg[0].msg,
        showConfirmButton: false,
        timer: 2000,
      });
    }
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
      } else {
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

  const handleWhatsapp = () => {
    const message = `Hola, tengo dudas acerca de este producto: ${prod.nombre} | https://chevronar.com/product/${params.id}`;
    const url = `https://wa.me/${
      import.meta.env.VITE_PHONE_NUMBER
    }?text=${encodeURIComponent(message)}`;
    open(url, "_blank");
  };

  return (
    <Container className="my-5 text-white">
      {mostrarSpinner ? (
        <div className="text-center my-5">
          <Spinner />
          <h5 className="mt-3">Cargando producto...</h5>
        </div>
      ) : (
        <>
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
                alt={`Chevronar | ${prod.nombre}`}
                loading="lazy"
              />
            </Col>
            <Col lg={8} md={12} sm={12} className="my-3">
              <h1>{prod.nombre}</h1>
              <hr />

              <div className="preciosClass">
                <h3>${prod.precio}</h3>
                <small>*Precios sujetos a cambios sin previo aviso</small>
              </div>

              <hr />
              <ul className="list-disc">
                {desc.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <hr />
              <div className="d-flex justify-content-between">
                {role !== "admin" && (
                  <Button
                    variant="outline-light"
                    className="fs-5"
                    onClick={handleWhatsapp}
                  >
                    ¿Tienes dudas? <i className="bi bi-whatsapp"></i>
                  </Button>
                )}
                {token && role === "user" && (
                  <Button
                    variant="outline-light"
                    className="fs-5"
                    onClick={() => addCart(prod._id)}
                  >
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
        </>
      )}
    </Container>
  );
};

export default OneProductPage;
