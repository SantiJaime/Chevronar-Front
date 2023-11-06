import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import CardComp from "../components/CardComp";
import clientAxios from "../utils/axiosClient";

const ProductsPage = () => {
  const [productos, setProductos] = useState([]);

  const getProducts = async () => {
    const res = await clientAxios.get("/productos");
    setProductos(res.data.allProds);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Container className="my-3 text-white">
        <h2>Nuestros productos</h2>
        <hr />
      <div className="d-flex justify-content-center">
        <InputGroup className="mb-3 widthBuscador">
          <InputGroup.Text id="buscadorId">
            <i className="bi bi-search"></i>
          </InputGroup.Text>
          <Form.Control
            placeholder="Busca tu producto aquí"
            type="search"
            // onChange={buscador}
          />
        </InputGroup>
      </div>
      <Row>
        <CardComp type={"prod"} productos={productos}/>
      </Row>
    </Container>
  );
};

export default ProductsPage;
