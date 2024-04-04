import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ConfirmMailPage = () => {
  return (
    <Container className="my-2 text-white">
    <Row>
      <Col className="d-flex justify-content-center">
        <img
          src="http://imgfz.com/i/xHVWvaE.png"
          alt="Confirmar mail"
          className="img-fluid rounded-5"
          loading="lazy"
        />
      </Col>
    </Row>
    <hr />
    <div className="text-center">
      <Link className="btn btn-outline-light fs-5" to={"/"}>
        <i className="bi bi-house-fill"></i> Volver a inicio
      </Link>
    </div>
  </Container>
  )
}

export default ConfirmMailPage