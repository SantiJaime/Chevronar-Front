import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { ErrorMessage, Formik } from "formik";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const CartPage = () => {
  const [products, setProducts] = useState([]);
  const [precioTotalPorProducto, setPrecioTotalPorProducto] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [user, setUser] = useState({});

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
      setUser(response.oneUser);
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

  const generarOrdenCompra = async (interes, metodo) => {
    setPrecioTotal(subtotal * interes);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_DEPLOY}/ordenes-compra`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            products,
            price: precioTotal,
            payMethod: metodo,
          }),
        }
      );
      const res = await response.json();
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: res.msg,
          timer: 2000,
          showConfirmButton: false,
        });
        const doc = new jsPDF();

        doc.text("Orden de compra", 20, 10);
        doc.setFontSize(12);
        doc.addImage("/logo2.png", "PNG", 110, 5, 100, 30);
        doc.text(`Fecha: ${new Date().toString().split("GMT")[0]}`, 10, 20);
        doc.text(`Cliente: ${user.name} | ${user.email}`, 10, 30);
        doc.text(`Método de pago: ${metodo}`, 10, 40);
        doc.setFontSize(11);
        doc.text(
          "Presenta esta orden de compra en nuestra sucursal principal para retirar tus productos. Tienes 24 horas ",
          10,
          50
        );
        doc.text(
          "para hacerlo. Una vez pasado el tiempo, se cancelará tu pedido",
          10,
          60
        );

        const columns = ["Producto", "Cantidad", "Precio unitario", "Total"];
        const data = products.map((prod) => [
          `${prod.nombre}`,
          `${prod.cantidad}`,
          `$${prod.precio}`,
          `$${precioTotalPorProducto[prod._id]}`,
        ]);

        doc.autoTable({
          startY: 70,
          head: [columns],
          body: data,
        });

        const backgroundColor = "#3084bc";
        doc.setFillColor(backgroundColor);
        const text = `Precio total: $${precioTotal}`;
        const textWidth =
          doc.getStringUnitWidth(text) * doc.internal.getFontSize();
        const textHeight = doc.internal.getLineHeight();
        const padding = 5;
        const rectWidth = textWidth - 5;
        const rectHeight = textHeight + 5;

        doc.rect(120 - padding, 280 - rectHeight, rectWidth, rectHeight, "F");
        const textX = 120;
        const textY = 275;
        doc.setFontSize(24);
        doc.setTextColor("#ffffff");
        doc.text(text, textX, textY);

        doc.save(`OrdenDeCompra-${user._id}.pdf`);
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
              >
                {({ values, handleChange }) => (
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
                            onChange={handleChange}
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
                        <hr />
                        <div className="d-flex justify-content-around">
                          <Button
                            variant="outline-light"
                            onClick={() =>
                              generarOrdenCompra(
                                1.1,
                                "Tarjeta de crédito | Naranja | 1 cuota"
                              )
                            }
                          >
                            Pagar en 1 cuota
                          </Button>
                          <Button
                            variant="outline-light"
                            onClick={() =>
                              generarOrdenCompra(
                                1.15,
                                "Tarjeta de crédito | Naranja | Plan Z"
                              )
                            }
                          >
                            Pagar en Plan Z
                          </Button>
                          <Button
                            variant="outline-light"
                            onClick={() =>
                              generarOrdenCompra(
                                1.2,
                                "Tarjeta de crédito | Naranja | 5 cuotas"
                              )
                            }
                          >
                            Pagar en 5 cuotas
                          </Button>
                          <Button
                            variant="outline-light"
                            onClick={() =>
                              generarOrdenCompra(
                                1.25,
                                "Tarjeta de crédito | Naranja | 6 cuotas"
                              )
                            }
                          >
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
                        <hr />
                        <div className="d-flex justify-content-around">
                          <Button
                            variant="outline-light"
                            onClick={() =>
                              generarOrdenCompra(
                                1.15,
                                `Tarjeta de crédito | ${values.tarjeta} | 1 cuota`
                              )
                            }
                          >
                            Pagar en 1 cuota
                          </Button>
                          <Button
                            variant="outline-light"
                            onClick={() =>
                              generarOrdenCompra(
                                1.25,
                                `Tarjeta de crédito | ${values.tarjeta} | 3 cuotas`
                              )
                            }
                          >
                            Pagar en 3 cuotas
                          </Button>
                          <Button
                            variant="outline-light"
                            onClick={() =>
                              generarOrdenCompra(
                                1.35,
                                `Tarjeta de crédito | ${values.tarjeta} | 6 cuotas`
                              )
                            }
                          >
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
                        <hr />
                        <Button
                          variant="outline-light"
                          onClick={() =>
                            generarOrdenCompra(
                              1.35,
                              `Tarjeta de crédito | ${values.tarjeta} | 6 cuotas`
                            )
                          }
                        >
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
                        <hr />
                        <Button
                          variant="outline-light"
                          onClick={() =>
                            generarOrdenCompra(
                              1.25,
                              `Tarjeta de crédito | ${values.tarjeta} | 3 cuotas`
                            )
                          }
                        >
                          Pagar en 3 cuotas
                        </Button>
                      </>
                    ) : values.metodo !== "Tarjeta de crédito" ? (
                      <>
                        <h3>Precio final ${subtotal}</h3>
                        <hr />
                        <Button
                          variant="outline-light"
                          onClick={() =>
                            generarOrdenCompra(
                              1,
                              `${values.metodo} | Pago único`
                            )
                          }
                        >
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
