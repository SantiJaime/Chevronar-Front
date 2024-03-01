import React, { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import TableComp from "../components/TableComp";
import clientAxios from "../utils/axiosClient";
import CreateModelComp from "../components/CreateModelComp";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const AdminPage = () => {
  const [productos, setProductos] = useState([]);
  const [productosAux, setProductosAux] = useState([]);
  const [users, setUsers] = useState([]);
  const [buyOrders, setBuyOrders] = useState([]);
  const [tableView, setTableView] = useState("prods");
  const [search, setSearch] = useState("");
  const [mostrarSpinner, setMostrarSpinner] = useState(true);

  const token = JSON.parse(sessionStorage.getItem("token"));

  const getProducts = async () => {
    const res = await clientAxios.get("/productos");
    setProductos(res.data.allProds);
    setProductosAux(res.data.allProds);
    setMostrarSpinner(false);
  };

  const getUsers = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_URL_DEPLOY}/usuarios`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await response.json();
    setUsers(res.allUsers);
  };

  const getOrders = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_URL_DEPLOY}/ordenes-compra`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await response.json();
    setBuyOrders(res.allOrders);
  };

  useEffect(() => {
    getProducts(), getUsers(), getOrders();
  }, []);

  const buscador = (ev) => {
    const { value } = ev.target;
    setSearch(value.toLowerCase());
  };

  useEffect(() => {
    if (search) {
      const resultados = productosAux.filter((prod) =>
        prod.nombre.toLowerCase().includes(search)
      );
      setProductos(resultados);
    } else setProductos(productosAux);
  }, [search, productosAux]);

  const toggleTable = (view) => setTableView(view);

  return (
    <Container className="my-5 text-white" fluid>
      <Button
        variant="outline-light"
        className={tableView === "prods" ? "mx-1 active" : "mx-1"}
        onClick={() => toggleTable("prods")}
      >
        Productos
      </Button>
      <Button
        variant="outline-light"
        className={tableView === "users" ? "mx-1 active" : "mx-1"}
        onClick={() => toggleTable("users")}
      >
        Usuarios
      </Button>
      <Button
        variant="outline-light"
        className={tableView === "buyOrders" ? "mx-1 active" : "mx-1"}
        onClick={() => toggleTable("buyOrders")}
      >
        Órdenes de compra
      </Button>
      {mostrarSpinner ? (
        <div className="text-center my-5">
          <Spinner />
          <h5 className="mt-3">Cargando productos...</h5>
        </div>
      ) : tableView === "prods" ? (
        <>
          <div className="mt-4 d-flex justify-content-between">
            <h3>Productos</h3>
            <CreateModelComp type="prod" getProducts={getProducts} />
          </div>
          <hr />
          <form className="flex items-center max-w-sm mx-auto mb-3">
            <label htmlFor="buscadorProductos" className="sr-only">
              Buscador
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center px-2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
              <input
                id="buscadorProductos"
                className="border text-sm rounded-full block w-full ps-10 p-2.5 bg-neutral-900 placeholder-gray-200 dark:text-white focus:border-gray-900"
                placeholder="Busca tu producto aquí"
                type="search"
                onChange={buscador}
              />
            </div>
          </form>
          {productos.length > 0 ? (
            <Table striped bordered hover responsive variant="dark">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Descripción</th>
                  <th>URL de imagen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <TableComp
                  productos={productos}
                  getProducts={getProducts}
                  type="prods"
                />
              </tbody>
            </Table>
          ) : (
            <h3 className="text-center mt-3">
              No existen resultados para su búsqueda
            </h3>
          )}
        </>
      ) : tableView === "users" ? (
        <>
          <div className="mt-4 d-flex justify-content-between text-white">
            <h3>Usuarios registrados</h3>
            <CreateModelComp type="user" getUsers={getUsers} />
          </div>
          <hr />
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre y apellido</th>
                <th>Correo electrónico</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <TableComp users={users} type="users" getUsers={getUsers} />
            </tbody>
          </Table>
        </>
      ) : (
        <>
          <h3 className="mt-4">Órdenes de compra de clientes</h3>
          <hr />
          {buyOrders.length > 0 ? (
            <Table striped bordered hover responsive variant="dark">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Productos comprados - Cantidad</th>
                  <th>Precio a pagar</th>
                  <th>Método de pago</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <TableComp
                  buyOrders={buyOrders}
                  type="buyOrders"
                  getOrders={getOrders}
                />
              </tbody>
            </Table>
          ) : (
            <h3 className="text-center">
              No hay órdenes de compra por el momento
            </h3>
          )}
        </>
      )}
    </Container>
  );
};

export default AdminPage;
