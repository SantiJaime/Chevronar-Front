import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Formik } from "formik";
import {
  //   errorEditUserSchema,
  //   errorRegisterOnAdminSchema,
  errorRegisterSchema,
} from "../utils/validationSchemas";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import clientAxios, { config } from "../utils/axiosClient";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";

const RegisterComp = ({ type }) => {
  const createUser = async (values) => {
    try {
      if (values.pass === values.repeatPass) {
        const res = await clientAxios.post(
          "/usuarios",
          {
            email: values.email,
            name: values.name,
            pass: values.pass,
          },
          config
        );
        if(res.status === 201){
          Swal.fire({
            icon: "success",
            title: res.data.msg,
            text: "Debes verificar tu cuenta para iniciar sesión. Checkea tu correo electrónico",
          });
          const templateParams = {
            to_email: values.email,
            message:
              "Gracias por registrarte en nuestra página. Por favor, verifica tu correo electrónico clickeando en el siguiente enlace:",
            token: res?.data?.token
          };
          await emailjs.send(
            import.meta.env.VITE_EMAIL_SERVICE_ID,
            import.meta.env.VITE_EMAIL_TEMPLATE_ID,
            templateParams,
            import.meta.env.VITE_EMAIL_PUBLIC_KEY
          );
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
        title: error.response.data.msg,
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      {
        type === "user" ? (
          <Formik
            initialValues={{
              email: "",
              name: "",
              pass: "",
              repeatPass: "",
            }}
            validationSchema={errorRegisterSchema}
            onSubmit={(values) => createUser(values)}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <Form className="fondo p-3 w-75 rounded-3 sombra text-white">
                <h3>Crea tu cuenta aquí</h3>
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
                      className={errors.name && touched.name && "is-invalid"}
                    />
                  </InputGroup>
                  <small className="text-danger">
                    {errors.name && touched.name && errors.name}
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
                    {errors.repeatPass &&
                      touched.repeatPass &&
                      errors.repeatPass}
                  </small>
                </Form.Group>
                <hr />
                <div className="d-flex justify-content-between">
                  <Link to={"/login"} className="linkFooter">
                    ¿Ya tienes cuenta? Inicia sesión aquí
                  </Link>
                  <Button variant="light" type="submit" onClick={handleSubmit}>
                    Registrarse
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          ""
        )
        //   ) : type === "admin" ? (
        //     <Formik
        //       initialValues={{
        //         email: "",
        //         name: "",
        //         pass: "",
        //         role: "",
        //         tel: "",
        //       }}
        //       validationSchema={errorRegisterOnAdminSchema}
        //       onSubmit={(values) => createUserOnAdmin(values)}
        //     >
        //       {({ values, errors, touched, handleChange, handleSubmit }) => (
        //         <Form>
        //           <Form.Group className="mb-3" controlId="emailId">
        //             <Form.Label>Correo electrónico</Form.Label>
        //             <InputGroup className="mb-3">
        //               <InputGroup.Text id="groupEmail">
        //                 <i className="bi bi-envelope-at-fill"></i>
        //               </InputGroup.Text>
        //               <Form.Control
        //                 placeholder="name@example.com"
        //                 type="email"
        //                 name="email"
        //                 value={values.email}
        //                 onChange={handleChange}
        //                 className={errors.email && touched.email && "is-invalid"}
        //               />
        //             </InputGroup>
        //             <small className="text-danger">
        //               {errors.email && touched.email && errors.email}
        //             </small>
        //           </Form.Group>
        //           <Form.Group className="mb-3" controlId="nameId">
        //             <Form.Label>Nombre y apellido</Form.Label>
        //             <InputGroup className="mb-3">
        //               <InputGroup.Text id="groupName">
        //                 <i className="bi bi-person-circle"></i>
        //               </InputGroup.Text>
        //               <Form.Control
        //                 placeholder="Ejemplo: Juan González"
        //                 type="text"
        //                 name="name"
        //                 value={values.name}
        //                 onChange={handleChange}
        //                 className={errors.name && touched.name && "is-invalid"}
        //               />
        //             </InputGroup>
        //             <small className="text-danger">
        //               {errors.name && touched.name && errors.name}
        //             </small>
        //           </Form.Group>
        //           <Form.Group className="mb-3" controlId="telId">
        //             <Form.Label>Número de teléfono</Form.Label>
        //             <InputGroup className="mb-3">
        //               <InputGroup.Text id="groupTel">
        //                 <i className="bi bi-telephone-fill"></i>
        //               </InputGroup.Text>
        //               <Form.Control
        //                 placeholder="Formato: 000-0000000"
        //                 type="number"
        //                 name="tel"
        //                 value={values.tel}
        //                 onChange={handleChange}
        //                 className={errors.tel && touched.tel && "is-invalid"}
        //               />
        //             </InputGroup>
        //             <small className="text-danger">
        //               {errors.tel && touched.tel && errors.tel}
        //             </small>
        //           </Form.Group>
        //           <Form.Group className="mb-3" controlId="passId">
        //             <Form.Label>Contraseña</Form.Label>
        //             <InputGroup className="mb-3">
        //               <InputGroup.Text id="groupPass">
        //                 <i className="bi bi-key-fill"></i>
        //               </InputGroup.Text>
        //               <Form.Control
        //                 placeholder="***********"
        //                 type="password"
        //                 name="pass"
        //                 value={values.pass}
        //                 onChange={handleChange}
        //                 className={errors.pass && touched.pass && "is-invalid"}
        //               />
        //             </InputGroup>
        //             <small className="text-danger">
        //               {errors.pass && touched.pass && errors.pass}
        //             </small>
        //           </Form.Group>
        //           <Form.Group className="mb-3" controlId="roleId">
        //             <Form.Label>Rol</Form.Label>
        //             <InputGroup className="mb-3">
        //               <InputGroup.Text id="groupRole">
        //                 <i className="bi bi-person-fill-gear"></i>
        //               </InputGroup.Text>
        //               <Form.Select
        //                 name="role"
        //                 value={values.role}
        //                 onChange={handleChange}
        //                 className={errors.role && touched.role && "is-invalid"}
        //               >
        //                 <option>Rol no seleccionado</option>
        //                 <option value="user">Usuario</option>
        //                 <option value="admin">Administrador</option>
        //               </Form.Select>
        //             </InputGroup>
        //             <small className="text-danger">
        //               {errors.role && touched.role && errors.role}
        //             </small>
        //           </Form.Group>
        //           <hr />
        //           <div className="text-end">
        //             <button
        //               className="btn botones"
        //               type="submit"
        //               onClick={handleSubmit}
        //             >
        //               Crear usuario
        //             </button>
        //           </div>
        //         </Form>
        //       )}
        //     </Formik>
        //   ) : type === "editUser" ? (
        //     <Formik
        //       initialValues={{
        //         name: user.name,
        //         role: user.role,
        //       }}
        //       validationSchema={errorEditUserSchema}
        //       onSubmit={(values) => editUser(values)}
        //     >
        //       {({ values, errors, touched, handleChange, handleSubmit }) => (
        //         <Form>
        //           <Form.Group className="mb-3" controlId="nameId">
        //             <Form.Label>Nombre y apellido</Form.Label>
        //             <InputGroup className="mb-3">
        //               <InputGroup.Text id="groupName">
        //                 <i className="bi bi-person-circle"></i>
        //               </InputGroup.Text>
        //               <Form.Control
        //                 placeholder="Ejemplo: Juan González"
        //                 type="text"
        //                 name="name"
        //                 value={values.name}
        //                 onChange={handleChange}
        //                 className={errors.name && touched.name && "is-invalid"}
        //               />
        //             </InputGroup>
        //             <small className="text-danger">
        //               {errors.name && touched.name && errors.name}
        //             </small>
        //           </Form.Group>
        //           <Form.Group className="mb-3" controlId="roleId">
        //             <Form.Label>Rol</Form.Label>
        //             <InputGroup className="mb-3">
        //               <InputGroup.Text id="groupRole">
        //                 <i className="bi bi-person-fill-gear"></i>
        //               </InputGroup.Text>
        //               <Form.Select
        //                 name="role"
        //                 value={values.role}
        //                 onChange={handleChange}
        //                 className={errors.role && touched.role && "is-invalid"}
        //               >
        //                 <option>Rol no seleccionado</option>
        //                 <option value="user">Usuario</option>
        //                 <option value="admin">Administrador</option>
        //               </Form.Select>
        //             </InputGroup>
        //             <small className="text-danger">
        //               {errors.role && touched.role && errors.role}
        //             </small>
        //           </Form.Group>
        //           <hr />
        //           <div className="text-end">
        //             <button
        //               className="btn botones"
        //               type="submit"
        //               onClick={handleSubmit}
        //             >
        //               Guardar cambios
        //             </button>
        //           </div>
        //         </Form>
        //       )}
        //     </Formik>
        //   ) : (
        //     ""
        //   )
      }
    </>
  );
};

export default RegisterComp;
