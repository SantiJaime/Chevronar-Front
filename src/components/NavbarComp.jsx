import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";

const NavbarComp = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggleClick = () => setToggle(!toggle);

  return (
    <Navbar collapseOnSelect expand="lg" fixed="top">
      <Container fluid>
        <Link to={"/"} className="whiteNavLink">
          <img
            src="/logo2.png"
            alt="Chevronar Logo"
            width={"200px"}
            className="img-fluid"
          />
        </Link>
        <button
          className="navbar-toggler border-white bg-transparent"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#responsive-navbar-nav"
          aria-controls="#responsive-navbar-nav"
          aria-expanded="true"
          aria-label="Toggle navigation"
          onClick={handleToggleClick}
        >
          <i
            className={`bi ${toggle ? "bi-x" : "bi-list"} text-white fs-1`}
          ></i>
        </button>
        <Navbar.Collapse id="responsive-navbar-nav">
          <hr className="displayNone text-white" />
          <Nav className="ms-3 me-auto">
            <NavLink to="/" className="whiteNavLink margenNavLinks">
              Inicio
            </NavLink>
            <NavLink to="/products" className="whiteNavLink margenNavLinks">
              Productos
            </NavLink>
            <NavLink to="/contact" className="whiteNavLink margenNavLinks">
              Contacto
            </NavLink>
          </Nav>
          <Nav className="ms-3">
            <NavLink to="/login" className="whiteNavLink margenNavLinks">
              Iniciar sesión
            </NavLink>
            <NavLink to="/register" className="whiteNavLink margenNavLinks">
              Registrarse
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
