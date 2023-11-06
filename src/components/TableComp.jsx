import React from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
// import EditModalComp from "./EditModalComp";

const TableComp = ({ type, productos, getProducts }) => {
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
                    // Authorization: `Bearer ${token}`,
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
                {/* <EditModalComp
                  type={"prods"}
                  prod={prod}
                  getProducts={getProducts}
                /> */}
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
              <td>{user.phoneNumber}</td>
              <td>{user.role}</td>
              <td className="text-center">
                {/* <EditModalComp type={"users"} getUsers={getUsers} user={user} /> */}
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
        : ""}
    </>
  );
};

export default TableComp;