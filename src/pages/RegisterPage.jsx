import React from 'react'
import { Container } from "react-bootstrap";
import RegisterComp from "../components/RegisterComp";

const RegisterPage = () => {
  return (
    <>
    <Container className="my-5 d-flex justify-content-center">
      <RegisterComp type={"user"}/>
    </Container>
  </>
  )
}

export default RegisterPage