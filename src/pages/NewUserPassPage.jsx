import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { errorPassSchema } from "../utils/validationSchemas";
import Swal from "sweetalert2";
import clientAxios, { config } from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";

const NewUserPassPage = () => {
  const navigate = useNavigate();
  const tokenPass = JSON.parse(localStorage.getItem("tokenPass"));

  const [viewPass, setViewPass] = useState(false);
  const [viewRepeatPass, setRepeatViewPass] = useState(false);

  const newUserPass = async (values) => {
    try {
      if (values.pass === values.repeatPass) {
        const res = await clientAxios.put(
          `/usuarios/recoveryPass/${tokenPass}`,
          {
            pass: values.pass,
          },
          config
        );
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: res.data.msg,
            text: "Ya puedes iniciar sesión",
            timer: 2000,
            showConfirmButton: false,
          });
          localStorage.removeItem("tokenPass");
          navigate("/login")
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Las contraseñas no coinciden",
          text: "Revisa tus datos",
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
  const handleRepeatViewPass = () => setRepeatViewPass(!viewRepeatPass)

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Formik
        initialValues={{
          pass: "",
          repeatPass: "",
        }}
        validationSchema={errorPassSchema}
        onSubmit={(values) => newUserPass(values)}
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
                      type={!viewPass ? "password" : "text"}
                      name="pass"
                      value={values.pass}
                      onChange={handleChange}
                      className={errors.pass && touched.pass && "is-invalid"}
                    />
                    <Button variant="light" onClick={handleViewPass}>
                      <i
                        className={!viewPass ? "bi bi-eye-slash" : "bi bi-eye"}
                      ></i>
                    </Button>
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
                      type={!viewRepeatPass ? "password" : "text"}
                      name="repeatPass"
                      value={values.repeatPass}
                      onChange={handleChange}
                      className={
                        errors.repeatPass && touched.repeatPass && "is-invalid"
                      }
                    />
                    <Button variant="light" onClick={handleRepeatViewPass}>
                      <i
                        className={!viewRepeatPass ? "bi bi-eye-slash" : "bi bi-eye"}
                      ></i>
                    </Button>
                  </InputGroup>
                  <small className="text-danger">
                    {errors.repeatPass &&
                      touched.repeatPass &&
                      errors.repeatPass}
                  </small>
                </Form.Group>
            <hr />
            <div className="text-end">
              <Button variant="light" type="submit" onClick={handleSubmit}>
                Restablecer contraseña
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default NewUserPassPage;
