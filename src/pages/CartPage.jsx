import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { ErrorMessage, Formik } from "formik";

const CartPage = () => {
  const [products, setProducts] = useState([]);
  const [precioTotalPorProducto, setPrecioTotalPorProducto] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

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
    setSubtotal(total);
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

  const paymentMethod = (values) => {
    const { metodo, tarjeta, cuotas } = values;

    if (metodo === "Tarjeta de crédito") {
      switch (tarjeta) {
        case "Naranja":
          if (cuotas === "1 pago") setPrecioTotal(subtotal * 1.1);
          else if (cuotas === "Plan Z") setPrecioTotal(subtotal * 1.15);
          else if (cuotas === "5 pagos") setPrecioTotal(subtotal * 1.2);
          else if (cuotas === "6 pagos") setPrecioTotal(subtotal * 1.25);
          break;
        case "Visa":
          if (cuotas === "1 pago") setPrecioTotal(subtotal * 1.15);
          else if (cuotas === "3 pagos") setPrecioTotal(subtotal * 1.25);
          else if (cuotas === "6 pagos") setPrecioTotal(subtotal * 1.35);
          break;
      }
    } else {
      setPrecioTotal(subtotal);
      console.log(precioTotal);
    }
  };
  return (
    <Container className="my-5 text-white">
      <Row>
        <Col sm={12}>
          <div className="d-flex justify-content-between">
            <h2>Mi carrito de compras</h2>
            <Button
              variant="light"
              onClick={emptyCart}
              className={products.length === 0 && "d-none"}
            >
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
              <h5 className="mt-3">Subtotal: ${subtotal}</h5>
              <Formik
                initialValues={{
                  metodo: "Efectivo",
                  tarjeta: "",
                  cuotas: "",
                }}
                onSubmit={(values) => paymentMethod(values)}
                validate={(values) => {
                  const errors = {};

                  if (
                    values.metodo === "Tarjeta de crédito" &&
                    !values.tarjeta
                  ) {
                    errors.tarjeta =
                      "Por favor, seleccione una tarjeta de crédito";
                  }
                }}
              >
                {({ values, handleChange, handleSubmit }) => (
                  <Form className="mt-3">
                    <div className="d-flex">
                      <Form.Group className="mb-3 me-2" controlId="methodId">
                        <Form.Label>¿Como desea pagar?</Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="groupMethod">
                            <i className="bi bi-coin"></i>
                          </InputGroup.Text>
                          <Form.Select
                            name="metodo"
                            value={values.metodo}
                            onChange={
                              values.metodo === "Tarjeta de Crédito"
                                ? handleChange
                                : (ev) => {
                                    handleChange(ev);
                                    handleSubmit();
                                  }
                            }
                          >
                            <option value="Efectivo">Efectivo</option>
                            <option value="Tarjeta de crédito">
                              Tarjeta de crédito
                            </option>
                            <option value="Tarjeta de débito">
                              Tarjeta de débito
                            </option>
                            <option value="Transferencia bancaria">
                              Transferencia bancaria
                            </option>
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>
                      {values.metodo === "Tarjeta de crédito" && (
                        <Form.Group className="mb-3 ms-2" controlId="cardId">
                          <Form.Label>Seleccione su tarjeta</Form.Label>
                          <InputGroup className="mb-3">
                            <InputGroup.Text id="groupCard">
                              <i className="bi bi-credit-card-fill"></i>
                            </InputGroup.Text>
                            <Form.Select
                              name="tarjeta"
                              value={values.tarjeta}
                              onChange={handleChange}
                            >
                              <option value="">Sin tarjeta seleccionda</option>
                              <option value="Naranja">Naranja</option>
                              <option value="Visa">Visa</option>
                              <option value="Mastercard">Mastercard</option>
                              <option value="American Express">
                                American Express
                              </option>
                              <option value="Cabal">Cabal</option>
                              <option value="Sol">Sol</option>
                              <option value="Credimas">Credimas</option>
                              <option value="Sucredito">Sucredito</option>
                              <option value="Titanio">Titanio</option>
                            </Form.Select>
                          </InputGroup>
                          <ErrorMessage
                            name="tarjeta"
                            component="p"
                            className="error-message"
                          />
                        </Form.Group>
                      )}
                    </div>

                    {values.metodo === "Tarjeta de crédito" &&
                    values.tarjeta === "Naranja" ? (
                      <>
                        <Table striped bordered hover responsive variant="dark">
                          <thead>
                            <tr>
                              <th>Cantidad de cuotas</th>
                              <th>Valor de la cuota</th>
                              <th>Precio final</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1 pago (10% de interés)</td>
                              <td>${precioTotal * 1.1}</td>
                              <td>${precioTotal * 1.1}</td>
                            </tr>
                            <tr>
                              <td>Plan Z (15% de interés)</td>
                              <td>${(precioTotal * 1.15) / 3}</td>
                              <td>${precioTotal * 1.15}</td>
                            </tr>
                            <tr>
                              <td>5 pagos (20% de interés)</td>
                              <td>${(precioTotal * 1.2) / 5}</td>
                              <td>${precioTotal * 1.2}</td>
                            </tr>
                            <tr>
                              <td>6 pagos (25% de interés)</td>
                              <td>${(precioTotal * 1.25) / 6}</td>
                              <td>${precioTotal * 1.25}</td>
                            </tr>
                          </tbody>
                        </Table>
                        <div className="d-flex justify-content-around">
                          <Button variant="outline-light">
                            Pagar en 1 cuota
                          </Button>
                          <Button variant="outline-light">
                            Pagar en Plan Z
                          </Button>
                          <Button variant="outline-light">
                            Pagar en 5 cuotas
                          </Button>
                          <Button variant="outline-light">
                            Pagar en 6 cuotas
                          </Button>
                        </div>
                      </>
                    ) : values.metodo === "Tarjeta de crédito" &&
                      (values.tarjeta === "Visa" ||
                        values.tarjeta === "Mastercard" ||
                        values.tarjeta === "American Express" ||
                        values.tarjeta === "Cabal") ? (
                      <>
                        <Table striped bordered hover responsive variant="dark">
                          <thead>
                            <tr>
                              <th>Cantidad de cuotas</th>
                              <th>Valor de la cuota</th>
                              <th>Precio final</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1 pago (15% de interés)</td>
                              <td>${precioTotal * 1.15}</td>
                              <td>${precioTotal * 1.15}</td>
                            </tr>
                            <tr>
                              <td>3 pagos (25% de interés)</td>
                              <td>${(precioTotal * 1.25) / 3}</td>
                              <td>${precioTotal * 1.25}</td>
                            </tr>
                            <tr>
                              <td>6 pagos (35% de interés)</td>
                              <td>${(precioTotal * 1.35) / 6}</td>
                              <td>${precioTotal * 1.35}</td>
                            </tr>
                          </tbody>
                        </Table>
                        <div className="d-flex justify-content-around">
                          <Button variant="outline-light">
                            Pagar en 1 cuota
                          </Button>
                          <Button variant="outline-light">
                            Pagar en 3 cuotas
                          </Button>
                          <Button variant="outline-light">
                            Pagar en 6 cuotas
                          </Button>
                        </div>
                      </>
                    ) : values.metodo === "Tarjeta de crédito" &&
                      values.tarjeta === "Sol" ? (
                      <>
                        <Table striped bordered hover responsive variant="dark">
                          <thead>
                            <tr>
                              <th>Cantidad de cuotas</th>
                              <th>Valor de la cuota</th>
                              <th>Precio final</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>3 pagos (35% de interés)</td>
                              <td>${(precioTotal * 1.35) / 3}</td>
                              <td>${precioTotal * 1.35}</td>
                            </tr>
                          </tbody>
                        </Table>
                        <Button variant="outline-light">
                          Pagar en 3 cuotas
                        </Button>
                      </>
                    ) : values.metodo === "Tarjeta de crédito" &&
                      (values.tarjeta === "Credimas" ||
                        values.tarjeta === "Sucredito" ||
                        values.tarjeta === "Titanio") ? (
                      <>
                        <Table striped bordered hover responsive variant="dark">
                          <thead>
                            <tr>
                              <th>Cantidad de cuotas</th>
                              <th>Valor de la cuota</th>
                              <th>Precio final</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>3 pagos (25% de interés)</td>
                              <td>${(precioTotal * 1.25) / 3}</td>
                              <td>${precioTotal * 1.25}</td>
                            </tr>
                          </tbody>
                        </Table>
                        <Button variant="outline-light">
                          Pagar en 3 cuotas
                        </Button>
                      </>
                    ) : values.metodo !== "Tarjeta de crédito" ? (
                      <>
                        <h3>Precio final ${subtotal}</h3>
                        <hr />
                        <Button variant="outline-light">
                          Generar orden de compra
                        </Button>
                      </>
                    ) : (
                      ""
                    )}
                  </Form>
                )}
              </Formik>
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
