import React, { useState } from "react";
import { Formik } from "formik";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { errorLoginSchema } from "../utils/validationSchemas";
import { Link, useNavigate } from "react-router-dom";
import clientAxios, { config } from "../utils/axiosClient";
import Swal from "sweetalert2";

const LoginPage = () => {
  const navigate = useNavigate();
  const [viewPass, setViewPass] = useState(false);

  const loginUser = async (values) => {
    try {
      const res = await clientAxios.post(
        "/usuarios/login",
        {
          email: values.email,
          pass: values.pass,
        },
        config
      );
      if (res?.data?.token) {
        sessionStorage.setItem("token", JSON.stringify(res.data.token));
        sessionStorage.setItem(
          "idUser",
          JSON.stringify(res.data.userExist._id)
        );
        sessionStorage.setItem("role", JSON.stringify(res.data.userExist.role));
        res.data?.userExist?.role === "user"
          ? navigate("/")
          : navigate("/admin");
      } else {
        Swal.fire({
          icon: "error",
          title: "¡Oh no!",
          text: "Usuario y/o contraseña incorrectos",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "¡Al parecer hubo un error!",
        text: error.response.data.msg,
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };
  const handleViewPass = () => setViewPass(!viewPass);

  return (
    <Container className="my-5 text-white">
      <div className="d-flex justify-content-center mb-5" data-aos="zoom-in">
        <Formik
          initialValues={{
            email: "",
            pass: "",
          }}
          validationSchema={errorLoginSchema}
          onSubmit={(values) => loginUser(values)}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form className="fondo p-3 w-75 rounded-3 sombra">
              <h3>Ingresá a tu cuenta</h3>
              <hr />
              <Form.Group className="mb-3" controlId="emailId">
                <Form.Label>Correo electrónico</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupEmail">
                    <i className="bi bi-envelope-at-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="name@example.com"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className={errors.email && touched.email && "is-invalid"}
                  />
                </InputGroup>
                <small className="text-danger">
                  {errors.email && touched.email && errors.email}
                </small>
              </Form.Group>
              <Form.Group className="mb-3" controlId="passId">
                <Form.Label>Contraseña</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupPass">
                    <i className="bi bi-key-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="***********"
                    type={!viewPass ? "password" : "text"}
                    name="pass"
                    value={values.pass}
                    onChange={handleChange}
                    className={errors.pass && touched.pass && "is-invalid"}
                  />
                  <InputGroup.Text id="groupPass">
                    <button
                      type="button"
                      className="border-0 bg-transparent viewPassButton"
                      onClick={handleViewPass}
                      aria-label="viewPassButton"
                    >
                      <i
                        className={!viewPass ? "bi bi-eye-slash" : "bi bi-eye"}
                      ></i>
                    </button>
                  </InputGroup.Text>
                </InputGroup>
                <small className="text-danger">
                  {errors.pass && touched.pass && errors.pass}
                </small>
              </Form.Group>
              <hr />
              <div className="d-flex justify-content-between">
                <Link to={"/register"} className="linkFooter">
                  ¿Aún no tienes cuenta? Registrate aquí
                </Link>
                <Button variant="light" type="submit" onClick={handleSubmit}>
                  Iniciar sesión
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="text-center" data-aos="fade-up">
        <hr />
        <Link
          className="btn btn-outline-light fs-5"
          to={"/sendMailRecoveryPass"}
        >
          <i className="bi bi-unlock"></i> ¿Olvidaste tu contraseña? Haz click
          aquí
        </Link>
      </div>
    </Container>
  );
};

export default LoginPage;
