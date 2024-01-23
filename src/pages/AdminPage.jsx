import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
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
  
  const token = JSON.parse(sessionStorage.getItem("token"));

  const getProducts = async () => {
    const res = await clientAxios.get("/productos");
    setProductos(res.data.allProds);
    setProductosAux(res.data.allProds);
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
      {tableView === "prods" ? (
        <>
          <div className="mt-4 d-flex justify-content-between">
            <h3>Productos</h3>
            <CreateModelComp type="prod" getProducts={getProducts} />
          </div>
          <hr />
          <div className="d-flex justify-content-center">
            <InputGroup className="mb-3 widthBuscador">
              <InputGroup.Text id="buscadorId">
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <Form.Control
                placeholder="Busca tu producto aquí"
                type="search"
                onChange={buscador}
              />
            </InputGroup>
          </div>
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
