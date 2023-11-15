import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CartPage = () => {
  const [products, setProducts] = useState([]);
  const [precioTotalPorProducto, setPrecioTotalPorProducto] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);

  const token = JSON.parse(sessionStorage.getItem("token"));
  const idUser = JSON.parse(sessionStorage.getItem("idUser"));

  const getCart = async () => {
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
      const response = await resUser.json();
      const { idCart } = response.oneUser;

      const resCart = await fetch(
        `${import.meta.env.VITE_URL_DEPLOY}/carrito/${idCart}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseCart = await resCart.json();
      setProducts(responseCart.cart.productos);
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
    getCart();
  }, []);

  const sumarCant = (id) => {
    const filtro = products.find((prod) => prod._id === id);
    if (filtro) {
      filtro.cantidad++;

      setProducts((prevCarrito) =>
        prevCarrito.map((cart) =>
          products._id === id ? { ...cart, ...filtro } : cart
        )
      );
    }
  };
  const restarCant = (id) => {
    const filtro = products.find((prod) => prod._id === id);
    if (filtro && filtro.cantidad > 1) {
      filtro.cantidad--;

      setProducts((prevCarrito) =>
        prevCarrito.map((cart) =>
          products._id === id ? { ...cart, ...filtro } : cart
        )
      );
    }
  };

  useEffect(() => {
    const precios = [];
    let total = 0;
    products.forEach((cart) => {
      const precioTotal = cart.cantidad * cart.precio;
      precios[cart._id] = precioTotal;
      total += precioTotal;
    });
    setPrecioTotalPorProducto(precios);
    setPrecioTotal(total);
  }, [products]);

  const eliminarProd = async (idProd) => {
    Swal.fire({
      title: "¿Estás seguro de borrar este producto del carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#20ad32",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
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
          const response = await resUser.json();
          const { idCart } = response.oneUser;

          const resDeleteProd = await fetch(
            `${import.meta.env.VITE_URL_DEPLOY}/carrito/${idCart}/${idProd}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const responseDelete = await resDeleteProd.json();
          if (responseDelete.status === 200) {
            Swal.fire({
              icon: "success",
              title: responseDelete.msg,
              showConfirmButton: false,
              timer: 1500,
            });
            getCart();
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "¡Al parecer hubo un error!",
            text: error,
            timer: 2000,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  const emptyCart = async () => {
    Swal.fire({
      title: "¿Estás seguro de vaciar tu carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#20ad32",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
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
          const response = await resUser.json();
          const { idCart } = response.oneUser;

          const resCart = await fetch(
            `${import.meta.env.VITE_URL_DEPLOY}/carrito/empty/${idCart}`,
            {
              method: "DELETE",
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
              title: responseCart.msg,
              timer: 2000,
              showConfirmButton: false,
            });
            getCart();
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "¡Al parecer hubo un error!",
            text: error,
            timer: 2000,
            showConfirmButton: false,
          });
        }
      }
    });
  };
  return (
    <Container className="my-5 text-white">
      <Row>
        <Col sm={12}>
          <div className="d-flex justify-content-between">
            <h2>Mi carrito de compras</h2>
            <Button variant="light" onClick={emptyCart}>
              <i className="bi bi-cart-x-fill"></i> Vaciar carrito
            </Button>
          </div>
          <hr />
          {products.length > 0 ? (
            <>
              <Table striped bordered hover variant="dark" responsive>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((prod) => (
                    <tr key={prod._id}>
                      <td>{prod.nombre}</td>
                      <td>${prod.precio}</td>
                      <td>
                        <div className="d-flex justify-content-center align-items-center">
                          <Button
                            className="mx-2"
                            variant="outline-light"
                            onClick={() => restarCant(prod._id)}
                          >
                            <i className="bi bi-dash-lg"></i>
                          </Button>
                          <h6>{prod.cantidad}</h6>
                          <Button
                            className="mx-2"
                            variant="outline-light"
                            onClick={() => sumarCant(prod._id)}
                          >
                            <i className="bi bi-plus-lg"></i>
                          </Button>
                        </div>
                      </td>
                      <td>${precioTotalPorProducto[prod._id]}</td>
                      <td className="text-center">
                        <Button
                          variant="danger"
                          onClick={() => eliminarProd(prod._id)}
                        >
                          <i className="bi bi-trash3-fill"></i> Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <hr />
              <h3>Total a pagar: ${precioTotal}</h3>
            </>
          ) : (
            <>
              <h4 className="text-center">
                Aún no agregaste nada a tu carrito
              </h4>
              <div className="text-center">
                <Link
                  className="btn btn-outline-light fs-5 mt-3"
                  to={"/products"}
                >
                  <i className="bi bi-list-task"></i> Ir a productos
                </Link>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
