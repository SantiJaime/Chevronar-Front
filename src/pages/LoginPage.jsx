import React from 'react'
import { Formik } from "formik";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { errorLoginSchema } from "../utils/validationSchemas";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";
// import clientAxios, { config } from "../utils/axiosClient";
// import Swal from "sweetalert2";
const LoginPage = () => {
  return (
    <Container className="my-5 d-flex justify-content-center text-white">
    <Formik
      initialValues={{
        email: "",
        pass: "",
      }}
      validationSchema={errorLoginSchema}
      onSubmit={(values) => ingresoCuenta(values)}
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
                type="password"
                name="pass"
                value={values.pass}
                onChange={handleChange}
                className={errors.pass && touched.pass && "is-invalid"}
              />
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
            <Button
              variant='light'
              type="submit"
              onClick={handleSubmit}
            >
              Iniciar sesión
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  </Container>
  )
}

export default LoginPage