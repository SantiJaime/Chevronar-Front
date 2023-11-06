import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import TableComp from "../components/TableComp";
import clientAxios from "../utils/axiosClient";
import CreateModelComp from "../components/CreateModelComp";

const AdminPage = () => {
  const [productos, setProductos] = useState([]);

  const getProducts = async () => {
    const res = await clientAxios.get("/productos");
    setProductos(res.data.allProds);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Container className="my-5 text-white" fluid>
      {/* <div className="d-flex justify-content-between">
      <h3>Usuarios registrados</h3>
      <ModalComp type="user" getUsers={getUsers}/>
    </div>
    <hr />
    <Table striped bordered hover responsive variant="dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre y apellido</th>
          <th>Número de teléfono</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody> */}
      {/* <TableComp users={users} type="users" getUsers={getUsers} /> */}
      {/* </tbody>
    </Table> */}
      <div className="mt-4 d-flex justify-content-between">
        <h3>Productos</h3>
        <CreateModelComp type="prod" getProducts={getProducts} />
      </div>
      <hr />
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
    </Container>
  );
};

export default AdminPage;
