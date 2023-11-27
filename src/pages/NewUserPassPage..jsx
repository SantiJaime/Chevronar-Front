import { Formik } from "formik";
import React from "react";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { errorPassSchema } from "../utils/validationSchemas";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";

const NewUserPassPage = () => {
  return (
    <Container className="my-5 d-flex justify-content-center">
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={errorPassSchema}
        onSubmit={(values) => sendMail(values.pass)}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <Form className="fondo p-3 w-75 rounded-3 sombra text-white">
            <h3>Restablece tu contraseña aquí</h3>
            <hr />
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
            <Form.Group className="mb-3" controlId="repeatPassId">
              <Form.Label>Repetir contraseña</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="groupRepeatPass">
                  <i className="bi bi-key-fill"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="***********"
                  type="password"
                  name="repeatPass"
                  value={values.repeatPass}
                  onChange={handleChange}
                  className={
                    errors.repeatPass && touched.repeatPass && "is-invalid"
                  }
                />
              </InputGroup>
              <small className="text-danger">
                {errors.repeatPass && touched.repeatPass && errors.repeatPass}
              </small>
            </Form.Group>
            <hr />
            <div className="text-end">
              <Button variant="light" type="submit" onClick={handleSubmit}>
                Enviar correo de recuperación
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default NewUserPassPage;
