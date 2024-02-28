import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Formik } from "formik";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { errorProdSchema } from "../utils/validationSchemas";
// import RegisterComp from "./RegisterComp";
import Swal from "sweetalert2";
import RegisterComp from "./RegisterComp";

const CreateModelComp = ({ type, getProducts, getUsers }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const categorias = [
    "Sin seleccionar categoría",
    "Destacado",
    "Motor",
    "Distribución",
    "Accesorios",
    "Suspensión y Dirección",
    "Frenos",
    "Lubricantes y Refrigerantes",
    "Baterías",
  ];
  const token = JSON.parse(sessionStorage.getItem("token"));

  const createProduct = async (values) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_DEPLOY}/productos`,
        {
          method: "POST",
          body: JSON.stringify({
            nombre: values.name,
            precio: values.price,
            categoria: values.cat,
            descripcion: values.desc,
            imagen: values.img,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = await response.json();
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: res.msg,
          timer: 1500,
          showConfirmButton: false,
        });
        handleClose();
        getProducts();
      } else {
        Swal.fire({
          icon: "error",
          title: "No se pudo crear el producto",
          text: error,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No se pudo crear el producto",
        text: error,
      });
    }
  };

  return (
    <>
      {type === "prod" ? (
        <>
          <Button variant="light" onClick={handleShow}>
            Crear producto
          </Button>

          <Modal show={show} onHide={handleClose}>
            <div className="fondo text-white">
              <Modal.Header closeButton>
                <Modal.Title>Crea un nuevo producto aquí</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Formik
                  initialValues={{
                    name: "",
                    price: "",
                    desc: "",
                    img: "",
                    cat: "",
                  }}
                  validationSchema={errorProdSchema}
                  onSubmit={(values) => createProduct(values)}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                  }) => (
                    <Form>
                      <Form.Group className="mb-3" controlId="nameId">
                        <Form.Label>Nombre</Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="groupName">
                            <i className="bi bi-card-text"></i>
                          </InputGroup.Text>
                          <Form.Control
                            placeholder="Ej: Kit distribución"
                            as={"textarea"}
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            className={
                              errors.name && touched.name && "is-invalid"
                            }
                          />
                        </InputGroup>
                        <small className="text-danger">
                          {errors.name && touched.name && errors.name}
                        </small>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="priceId">
                        <Form.Label>Precio</Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="groupPrice">
                            <i className="bi bi-currency-dollar"></i>
                          </InputGroup.Text>
                          <Form.Control
                            placeholder="999"
                            type="number"
                            name="price"
                            value={values.price}
                            onChange={handleChange}
                            className={
                              errors.price && touched.price && "is-invalid"
                            }
                          />
                        </InputGroup>
                        <small className="text-danger">
                          {errors.price && touched.price && errors.price}
                        </small>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="catId">
                        <Form.Label>Categoría</Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="groupCat">
                            <i className="bi bi-tag-fill"></i>
                          </InputGroup.Text>
                          <Form.Select
                            name="cat"
                            value={values.cat}
                            onChange={handleChange}
                            className={
                              errors.cat && touched.cat && "is-invalid"
                            }
                          >
                            {categorias.map((cat) => (
                              <option
                                value={
                                  cat === "Sin seleccionar categoría" ? "" : cat
                                }
                              >
                                {cat}
                              </option>
                            ))}
                          </Form.Select>
                        </InputGroup>
                        <small className="text-danger">
                          {errors.cat && touched.cat && errors.cat}
                        </small>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="descId">
                        <Form.Label>Descripción</Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="groupDesc">
                            <i className="bi bi-file-text-fill"></i>
                          </InputGroup.Text>
                          <Form.Control
                            placeholder="Detalles del producto"
                            as={"textarea"}
                            rows={2}
                            name="desc"
                            value={values.desc}
                            onChange={handleChange}
                            className={
                              errors.desc && touched.desc && "is-invalid"
                            }
                          />
                        </InputGroup>
                        <small className="text-danger">
                          {errors.desc && touched.desc && errors.desc}
                        </small>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="imgId">
                        <Form.Label>URL de imagen</Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="groupImg">
                            <i className="bi bi-image"></i>
                          </InputGroup.Text>
                          <Form.Control
                            placeholder="https://imagen.com/img.png"
                            type="text"
                            name="img"
                            value={values.img}
                            onChange={handleChange}
                            className={
                              errors.img && touched.img && "is-invalid"
                            }
                          />
                        </InputGroup>
                        <small className="text-danger">
                          {errors.img && touched.img && errors.img}
                        </small>
                      </Form.Group>
                      <hr />
                      <div className="text-end">
                        <Button
                          variant="outline-light"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Crear producto
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Modal.Body>
            </div>
          </Modal>
        </>
      ) : type === "user" ? (
        <>
          <Button variant="light" onClick={handleShow}>
            Crear usuario
          </Button>

          <Modal show={show} onHide={handleClose}>
            <div className="fondo text-white">
              <Modal.Header closeButton>
                <Modal.Title>Crea un nuevo usuario aquí</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <RegisterComp
                  type={"admin"}
                  getUsers={getUsers}
                  handleClose={handleClose}
                />
              </Modal.Body>
            </div>
          </Modal>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default CreateModelComp;
