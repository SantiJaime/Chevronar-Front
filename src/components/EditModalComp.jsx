import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import {
  errorEditUserSchema,
  errorProdSchema,
} from "../utils/validationSchemas";
import { Formik } from "formik";
import Swal from "sweetalert2";

const EditModalComp = ({ type, prod, getProducts, user, getUsers }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = JSON.parse(sessionStorage.getItem("token"));

  const editProduct = async (values, idProd) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_DEPLOY}/productos/${idProd}`,
        {
          method: "PUT",
          body: JSON.stringify({
            nombre: values.name,
            precio: values.price,
            descripcion: values.desc,
            categoria: values.cat,
            imagen: values.img,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = await response.json();
      if (res.status === 200) {
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
          title: res.msg,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No se pudo editar el producto",
        text: error,
      });
    }
  };
  const editUser = async (values) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL_DEPLOY}/usuarios/${user._id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: values.name,
            role: values.role,
          }),
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
          timer: 1500,
          showConfirmButton: false,
        });
        handleClose();
        getUsers();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No se pudo editar el usuario",
        text: error,
      });
    }
  };
  return (
    <>
      {type === "prods" ? (
        <>
          <Button variant="success" onClick={handleShow} className="my-2 mx-2">
            <i className="bi bi-pencil-fill"></i> Editar
          </Button>

          <Modal show={show} onHide={handleClose}>
            <div className="fondo text-white">
              <Modal.Header closeButton>
                <Modal.Title>Edita este producto</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Formik
                  initialValues={{
                    name: prod.nombre,
                    price: prod.precio,
                    desc: prod.descripcion,
                    img: prod.imagen,
                    cat: prod.categoria,
                  }}
                  validationSchema={errorProdSchema}
                  onSubmit={(values) => editProduct(values, prod._id)}
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
                            placeholder="Ej: Collar"
                            type="text"
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
                            <option value="Destacado">Destacado</option>
                            <option value="Motor">Motor</option>
                            <option value="Distribución">Distribución</option>
                            <option value="Accesorios">Accesorios</option>
                            <option value="Embrague">Embrague</option>
                            <option value="Suspensión">Suspensión</option>
                            <option value="Frenos">Frenos</option>
                            <option value="Lubricantes">Lubricantes</option>
                            <option value="Carrocería">Carrocería</option>
                            <option value="Faros">Faros</option>
                            <option value="Baterías">Baterías</option>
                            <option value="Exterior">Exterior</option>
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
                            rows={3}
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
                          Guardar cambios
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Modal.Body>
            </div>
          </Modal>
        </>
      ) : type === "users" ? (
        <>
          <Button variant="success" onClick={handleShow} className="my-2 mx-2">
            <i className="bi bi-pencil-fill"></i> Editar
          </Button>

          <Modal show={show} onHide={handleClose}>
            <div className="fondo text-white">
              <Modal.Header closeButton>
                <Modal.Title>Edita este usuario</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Formik
                  initialValues={{
                    name: user.name,
                    role: user.role,
                  }}
                  validationSchema={errorEditUserSchema}
                  onSubmit={(values) => editUser(values)}
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
                        <Form.Label>Nombre y apellido</Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="groupName">
                            <i className="bi bi-person-circle"></i>
                          </InputGroup.Text>
                          <Form.Control
                            placeholder="Ejemplo: Juan González"
                            type="text"
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
                      <Form.Group className="mb-3" controlId="roleId">
                        <Form.Label>Rol</Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="groupRole">
                            <i className="bi bi-person-fill-gear"></i>
                          </InputGroup.Text>
                          {user.role === "admin" ? (
                            <Form.Control
                              defaultValue={user.role}
                              disabled
                            ></Form.Control>
                          ) : (
                            <Form.Select
                              name="role"
                              value={values.role}
                              onChange={handleChange}
                              className={
                                errors.role && touched.role && "is-invalid"
                              }
                            >
                              <option value="user">Usuario</option>
                              <option value="admin">Administrador</option>
                            </Form.Select>
                          )}
                        </InputGroup>
                        <small className="text-danger">
                          {errors.role && touched.role && errors.role}
                        </small>
                      </Form.Group>
                      <hr />
                      <div className="text-end">
                        <Button
                          variant="outline-light"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Guardar cambios
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
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

export default EditModalComp;
