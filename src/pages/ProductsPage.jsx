import React, { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import CardComp from "../components/CardComp";
import clientAxios from "../utils/axiosClient";
import { Input } from "@material-tailwind/react";

const ProductsPage = () => {
  const [productos, setProductos] = useState([]);
  const [productosAux, setProductosAux] = useState([]);
  const [search, setSearch] = useState("");
  const [mostrarSpinner, setMostrarSpinner] = useState(true);

  const getProducts = async () => {
    const res = await clientAxios.get("/productos");
    setProductos(res.data.allProds);
    setProductosAux(res.data.allProds);
    setMostrarSpinner(false);
  };

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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container className="my-3 text-white">
      <h2>Nuestros productos</h2>
      <hr />
      {mostrarSpinner ? (
        <div className="text-center my-5">
          <Spinner />
          <h5 className="mt-3">Cargando productos...</h5>
        </div>
      ) : (
        <>
          <form className="flex items-center max-w-sm mx-auto">
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
                className="border text-sm rounded-full block w-full ps-10 p-2.5 bg-zinc-900 placeholder-gray-200 dark:text-white focus:border-gray-900"
                placeholder="Busca tu producto aquí"
                type="search"
                onChange={buscador}
              />
            </div>
          </form>
          <Row>
            <CardComp type={"prod"} productos={productos} />
          </Row>
        </>
      )}
    </Container>
  );
};

export default ProductsPage;
