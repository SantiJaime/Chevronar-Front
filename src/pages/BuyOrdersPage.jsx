import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";

const BuyOrdersPage = () => {
  const [buyOrders, setBuyOrders] = useState([]);

  const token = JSON.parse(sessionStorage.getItem("token"));
  const idUser = JSON.parse(sessionStorage.getItem("idUser"));

  const getOrders = async () => {
    try {
      const responseUser = await fetch(
        `${import.meta.env.VITE_URL_DEPLOY}/usuarios/${idUser}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resUser = await responseUser.json();
      const responseOrders = await fetch(
        `${
          import.meta.env.VITE_URL_DEPLOY
        }/ordenes-compra/mis-ordenes/${encodeURIComponent(
          resUser.oneUser.email
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resOrders = await responseOrders.json();
      setBuyOrders(resOrders.oneUserOrders);
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

  useEffect(() => {
    getOrders();
  }, []);

  const deleteOrder = (id, type) => {
    if (type === "Cancelar") {
      Swal.fire({
        title: "¿Estás seguro de cancelar esta orden de compra?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#20ad32",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await fetch(
              `${import.meta.env.VITE_URL_DEPLOY}/ordenes-compra/${id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const response = await res.json();
            if (response.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Orden de compra cancelada correctamente",
                showConfirmButton: false,
                timer: 1500,
              });
              getOrders();
            } else {
              Swal.fire({
                icon: "error",
                title: "Hubo un error",
                text: response.msg,
                showConfirmButton: false,
                timer: 2000,
              });
            }
          } catch (error) {
            Swal.fire({
              title: "No se pudo eliminar la orden de compra",
              text: error,
              icon: "error",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        }
      });
    } else {
      Swal.fire({
        title:
          "¿Estás seguro que retiraste tus productos de la orden de compra?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#20ad32",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await fetch(
              `${import.meta.env.VITE_URL_DEPLOY}/ordenes-compra/${id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const response = await res.json();
            if (response.status === 200) {
              Swal.fire({
                icon: "success",
                title: response.msg,
                showConfirmButton: false,
                timer: 1500,
              });
              getOrders();
            } else {
              Swal.fire({
                icon: "error",
                title: "Hubo un error",
                text: response.msg,
                showConfirmButton: false,
                timer: 2000,
              });
            }
          } catch (error) {
            Swal.fire({
              title: "No se pudo eliminar la orden de compra",
              text: error,
              icon: "error",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        }
      });
    }
  };

  return (
    <Container className="my-5 text-white" fluid>
      <div className="mt-4 d-flex justify-content-between text-white">
        <h3>Mis órdenes de compra</h3>
      </div>
      <hr />
      {buyOrders.length > 0 ? (
        <Table striped bordered hover responsive variant="dark">
          <thead>
            <tr>
              <th>Mis datos</th>
              <th>Productos comprados - Cantidad</th>
              <th>Precio a pagar</th>
              <th>Método de pago</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {buyOrders.map((order) => (
              <tr key={order._id}>
                <td>
                  {order.name} | {order.email}
                </td>
                <td>
                  <ul className="p-0 m-0">
                    {order.products.map((prod) => (
                      <li key={prod._id}>
                        {prod.nombre} - {prod.cantidad}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>${order.price}</td>
                <td>{order.payMethod}</td>
                <td className="text-center">
                  <Button
                    variant="success"
                    className="my-2 mx-2"
                    onClick={() => deleteOrder(order._id, "Retirados")}
                  >
                    <i className="bi bi-check-circle"></i> Productos retirados
                  </Button>
                  <Button
                    variant="danger"
                    className="my-2 mx-2"
                    onClick={() => deleteOrder(order._id, "Cancelar")}
                  >
                    <i className="bi bi-trash3-fill"></i> Cancelar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h3 className="text-center">No hay órdenes de compra por el momento</h3>
      )}
    </Container>
  );
};

export default BuyOrdersPage;
