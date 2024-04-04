import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import CardComp from "../components/CardComp";
import clientAxios from "../utils/axiosClient";
import { Typography } from "@material-tailwind/react";

const Homepage = () => {
  const [productos, setProductos] = useState([]);
  const [mostrarSpinner, setMostrarSpinner] = useState(true);
  const [verMas, setVerMas] = useState(false);
  const [height, setHeight] = useState("70vh");

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 991) {
        setHeight("50vh");
      } else {
        setHeight("70vh");
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const getProducts = async () => {
    try {
      const res = await clientAxios.get("/productos");
      setProductos(res.data.allProds);
      setMostrarSpinner(false);
    } catch (error) {
      console.log("Error al traer los productos", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const carouselImgs = [
    "/slider1.webp",
    "/slider2.webp",
    "/slider3.webp",
    "/slider4.webp",
  ];

  const handleButton = () => setVerMas(!verMas);
  return (
    <>
      <Carousel data-bs-theme="dark" data-aos="zoom-in">
        {carouselImgs.map((img, index) => (
          <Carousel.Item key={index}>
            <img
              src={img}
              style={{height: height, width: "100%"}}
              className="object-cover"
              alt={`Slider ${index + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <Container fluid className="my-5 text-white">
        <Row className="justify-content-center">
          <Col lg={12} md={12} sm={12} className="mb-5 px-4">
            <section className="relative isolate overflow-hidden bg-zinc-900 px-6 py-10 sm:py-20 lg:px-8 text-center rounded-lg">
              <div className="absolute inset-y-0 right-1/2 -z-10 w-[200%] origin-bottom-left skew-x-[-30deg] bg-neutral-950 shadow-xl shadow-indigo-600/10 ring-1 ring-slate-900  xl:origin-center"></div>
              <Row>
                <Col sm={12} md={6} data-aos="fade-right" className="my-3">
                  <div className="mx-auto max-w-2xl lg:max-w-4xl">
                    <Typography variant="h1">
                      Chevronar - ¿Quiénes somos?
                    </Typography>
                    <hr />
                    {verMas ? (
                      <Typography className="text-start">
                        Chevronar es una empresa de ventas de autopartes y
                        repuestos de la marca Chevrolet con mas de 10 años de
                        experiencia en el rubro. Ofrecemos una amplia gama de
                        autopartes y repuestos originales y alternativos para
                        diversos modelos y años de fabricación. Nuestro catálogo
                        incluye piezas de motor, sistemas de frenos, suspensión,
                        carrocería, iluminación, accesorios y mucho más.
                        Trabajamos directamente con proveedores autorizados para
                        garantizar la autenticidad y calidad de cada producto
                        que ofrecemos. Ya sea que necesites una reparación
                        básica o una actualización de rendimiento, tenemos las
                        piezas adecuadas para satisfacer tus necesidades. En
                        Chevronar, nos comprometemos a proporcionar productos de
                        la más alta calidad a nuestros clientes. Cada autoparte
                        y repuesto que vendemos está respaldado por nuestra
                        garantía de calidad y cumple con los estándares
                        rigurosos de la marca Chevrolet. Además, ofrecemos una
                        política de devolución sin complicaciones para
                        garantizar la satisfacción del cliente. Nuestro objetivo
                        es brindar una experiencia de compra sin preocupaciones
                        y asegurarnos de que obtengas las piezas adecuadas para
                        tu vehículo.
                      </Typography>
                    ) : (
                      <Typography className="text-start">
                        Chevronar es una empresa de ventas de autopartes y
                        repuestos de la marca Chevrolet con mas de 10 años de
                        experiencia en el rubro. Ofrecemos una amplia gama de
                        autopartes y repuestos originales y alternativos...
                      </Typography>
                    )}
                    <Button
                      onClick={handleButton}
                      className="widthButton mb-2"
                      variant="light"
                    >
                      {!verMas ? "Ver más" : "Ver menos"}
                    </Button>
                  </div>
                </Col>
                <Col sm={12} md={6} data-aos="fade-left" className="my-3">
                  <img
                    className="mx-auto img-fluid"
                    src="/logo2_preview_rev_1.webp"
                    width={"500px"}
                    height={"auto"}
                    alt="Logo Chevronar"
                    loading="lazy"
                  />
                </Col>
              </Row>
            </section>
          </Col>
          <Col lg={12} md={12} sm={12}>
            <h2>Productos destacados</h2>
            <hr />
            {mostrarSpinner ? (
              <div className="text-center my-5">
                <Spinner />
                <h5 className="mt-3">Cargando productos...</h5>
              </div>
            ) : (
              <Row>
                <CardComp type={"prodsDestacados"} productos={productos} />
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Homepage;
