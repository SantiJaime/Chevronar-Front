import React from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import EditModalComp from "./EditModalComp";

const TableComp = ({
  type,
  productos,
  getProducts,
  users,
  getUsers,
  buyOrders,
  getOrders,
}) => {
  const token = JSON.parse(sessionStorage.getItem("token"));

  const deleteProd = (id) => {
    Swal.fire({
      title: "¿Estás seguro de borrar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_URL_LOCAL}/productos/${id}`,
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
              title: "Producto eliminado correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            getProducts();
          }
        } catch (error) {
          Swal.fire({
            title: "No se pudo eliminar el producto",
            text: error,
            icon: "error",
          });
        }
      }
    });
  };
  const deleteUser = (id, role) => {
    if (role === "admin") {
      return Swal.fire({
        icon: "error",
        title: "No es posible eliminar un usuario administrador",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    Swal.fire({
      title: "¿Estás seguro de borrar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resUser = await fetch(
            `${import.meta.env.VITE_URL_DEPLOY}/usuarios/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const responseUser = await resUser.json();
          const { idCart } = responseUser.deletedUser;
          const resCart = await fetch(
            `${import.meta.env.VITE_URL_DEPLOY}/carrito/${idCart}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const responseCart = await resCart.json();
          if (responseUser.status === 200 && responseCart.status === 200) {
            Swal.fire({
              title: "Usuario eliminado correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            getUsers();
          }
        } catch (error) {
          Swal.fire({
            title: "No se pudo eliminar el usuario",
            text: error,
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    });
  };
  const deleteOrder = (id) => {
    Swal.fire({
      title: "¿Estás seguro de borrar esta orden de compra?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
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
          console.log("error en try", response)
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: response.msg,
              showConfirmButton: false,
              timer: 1500,
            });
            getOrders();
          }
        } catch (error) {
          console.log("error en catch", error)
          Swal.fire({
            title: "No se pudo eliminar la orden de compra",
            text: error,
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <>
      {type === "prods"
        ? productos.map((prod) => (
            <tr key={prod._id}>
              <td>{prod.nombre}</td>
              <td>${prod.precio}</td>
              <td>{prod.categoria}</td>
              <td>{prod.descripcion}</td>
              <td>{prod.imagen}</td>
              <td className="text-center">
                <EditModalComp
                  type={"prods"}
                  prod={prod}
                  getProducts={getProducts}
                />
                <Button
                  variant="danger"
                  className="my-2 mx-2"
                  onClick={() => deleteProd(prod._id)}
                >
                  <i className="bi bi-trash3-fill"></i> Eliminar
                </Button>
              </td>
            </tr>
          ))
        : type === "users"
        ? users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="text-center">
                <EditModalComp type={"users"} getUsers={getUsers} user={user} />
                <Button
                  variant="danger"
                  className="my-2 mx-2"
                  onClick={() => deleteUser(user._id, user.role)}
                >
                  <i className="bi bi-trash3-fill"></i> Eliminar
                </Button>
              </td>
            </tr>
          ))
        : buyOrders.map((order) => (
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
                  variant="danger"
                  className="my-2 mx-2"
                  onClick={() => deleteOrder(order._id)}
                >
                  <i className="bi bi-trash3-fill"></i> Eliminar
                </Button>
              </td>
            </tr>
          ))}
    </>
  );
};

export default TableComp;
