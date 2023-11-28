import { Formik } from "formik";
import React from "react";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { errorMailSchema } from "../utils/validationSchemas";
import clientAxios, { config } from "../utils/axiosClient";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";

const MailRecoveryPassPage = () => {
  const sendMail = async (email) => {
    try {
      const res = await clientAxios.post(
        "/usuarios/sendMailRecoveryPass",
        {
          email
        },
        config
      );
        if(res.status === 201){
          Swal.fire({
              icon: "success",
              title: res.data.msg,
              text: "Checkea tu correo electrónico. El correo puede demorar, por favor sé paciente.",
              timer: 3000,
              showConfirmButton: false,
            });
            localStorage.setItem("tokenPass", JSON.stringify(res.data.token))
            const templateParams = {
                subject: "Chevronar | Recuperación de contraseña",
                to_email: email,
                title: "Solicitud de cambio de contraseña",
                message:
                  "Has solicitado un cambio de contraseña en tu cuenta, por favor clickea el siguiente enlace para restablecer tu contraseña:",
                buttonText: "Restablecer contraseña",
                buttonLink: `${import.meta.env.VITE_URL_DEPLOY_FRONT}/newUserPass`
              };
              await emailjs.send(
                import.meta.env.VITE_EMAIL_SERVICE_ID,
                import.meta.env.VITE_EMAIL_TEMPLATE_ID,
                templateParams,
                import.meta.env.VITE_EMAIL_PUBLIC_KEY
              );
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

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={errorMailSchema}
        onSubmit={(values) => sendMail(values.email)}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <Form className="fondo p-3 w-75 rounded-3 sombra text-white">
            <h3>Recupera tu contraseña aquí</h3>
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

export default MailRecoveryPassPage;
