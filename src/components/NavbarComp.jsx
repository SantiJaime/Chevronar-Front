import React, { Fragment, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";

const NavbarComp = () => {
  const navigation = [
    { name: "Inicio", to: "/", current: false },
    { name: "Productos", to: "/products", current: false },
    { name: "Contacto", to: "/contact", current: false },
  ];
  const navigationMobile = [
    { name: "Inicio", to: "/", current: false },
    { name: "Productos", to: "/products", current: false },
    { name: "Contacto", to: "/contact", current: false },
    { name: "Iniciar sesión", to: "/login", current: false },
    { name: "Registarse", to: "/register", current: false },
  ];
  const navigationAdmin = [
    { name: "Inicio", to: "/", current: false },
    { name: "Productos", to: "/products", current: false },
  ];
  const navigationAdminMobile = [
    { name: "Inicio", to: "/", current: false },
    { name: "Productos", to: "/products", current: false },
    { name: "Administrador", to: "/admin", current: false },
    { name: "Cerrar sesión", current: false },
  ];
  const navigationAdmin2 = [
    { name: "Administrador", to: "/admin", current: false },
    { name: "Cerrar sesión", current: false },
  ];
  const navigation2 = [
    { name: "Iniciar sesión", to: "/login", current: false },
    { name: "Registrarse", to: "/register", current: false },
  ];
  const navigationUserMobile = [
    { name: "Inicio", to: "/", current: false },
    { name: "Productos", to: "/products", current: false },
    { name: "Contacto", to: "/contact", current: false },
    { name: "Mis órdenes de compra", to: "/orders", current: false },
    { name: "Mi carrito", to: "/cart", current: false },
    { name: "Cerrar sesión", current: false },
  ];
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const token = JSON.parse(sessionStorage.getItem("token"));
  const role = JSON.parse(sessionStorage.getItem("role"));

  const handleClick = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const logOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("idUser");

    navigate("/");
  };
  return (
    <header>
      <nav
        className="flex items-center justify-between p-3 lg:px-8"
        aria-label="Navbar Chevronar"
      >
        <div className="flex lg:flex-1">
          <Link to={"/"}>
            <img
              className="img-fluid"
              src="/logo2_preview_rev_1.webp"
              alt="Logo Chevronar"
              width={"200px"}
              height={"auto"}
              loading="lazy"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <span className="sr-only">Abrir menú</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {token && role === "admin"
            ? navigationAdmin.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`text-sm font-semibold leading-6 px-2 py-1 text-md no-underline rounded-md ${
                    pathname === item.to
                      ? "text-white bg-neutral-800"
                      : "text-neutral-100 hover:bg-neutral-700 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))
            : navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`text-sm font-semibold leading-6 px-2 py-1 text-md no-underline rounded-md ${
                    pathname === item.to
                      ? "text-white bg-neutral-800"
                      : "text-neutral-100 hover:bg-neutral-700 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
        </div>
        <div className="hidden lg:flex lg:gap-x-6 lg:flex-1 lg:justify-end">
          {!token ? (
            navigation2.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`text-sm font-semibold leading-6 px-2 py-1 text-md no-underline rounded-md ${
                  pathname === item.to
                    ? "text-white bg-neutral-800"
                    : "text-neutral-100 hover:bg-neutral-700 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))
          ) : token && role === "user" ? (
            <>
              <div className="relative">
                <button
                  onClick={toggleMenu}
                  className="text-sm font-semibold leading-6 px-2 py-1 text-md no-underline rounded-md text-neutral-100 hover:bg-neutral-700 hover:text-white"
                  aria-labelledby="mi-cuenta"
                >
                  <i id="mi-cuenta" className="bi bi-person-circle"></i> Mi
                  cuenta
                  <i className="bi bi-caret-down"></i>
                </button>
                {menuOpen && (
                  <div className="flex justify-center">
                    <ul className="absolute z-10 min-w-[180px] overflow-auto rounded-md text-neutral-100 bg-neutral-900 p-2 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none w-full">
                      <Link
                        to="/cart"
                        className="w-auto text-neutral-100 no-underline block cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-neutral-700"
                      >
                        <i className="bi bi-cart4"></i> Mi carrito
                      </Link>
                      <Link
                        to="/orders"
                        className="block w-auto text-neutral-100 no-underline cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-neutral-700"
                      >
                        <i className="bi bi-bag-fill"></i> Mis órdenes de compra
                      </Link>
                    </ul>
                  </div>
                )}
              </div>
              <button
                onClick={logOut}
                aria-labelledby="logOut"
                className="text-sm font-semibold leading-6 px-2 py-1 text-md no-underline rounded-md text-neutral-100 hover:bg-neutral-700 hover:text-white"
              >
                <i id="logOut" className="bi bi-door-open-fill"></i> Cerrar
                sesión
              </button>
            </>
          ) : token && role === "admin" ? (
            navigationAdmin2.map((item) =>
              item.name === "Cerrar sesión" ? (
                <button
                  key={item.name}
                  className={`text-sm font-semibold leading-6 px-2 py-1 text-md no-underline rounded-md ${
                    pathname === item.to
                      ? "text-white bg-neutral-800"
                      : "text-neutral-100 hover:bg-neutral-700 hover:text-white"
                  }`}
                  aria-labelledby={item.name}
                  onClick={logOut}
                >
                  <i id={item.name} className="bi bi-door-open-fill"></i>{" "}
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`text-sm font-semibold leading-6 px-2 py-1 text-md no-underline rounded-md ${
                    pathname === item.to
                      ? "text-white bg-neutral-800"
                      : "text-neutral-100 hover:bg-neutral-700 hover:text-white"
                  }`}
                >
                  <i className="bi bi-person-gear"></i> {item.name}
                </Link>
              )
            )
          ) : (
            ""
          )}
        </div>
      </nav>
      <Transition.Root as={Fragment} show={mobileMenuOpen}>
        <Dialog as="div" className="lg:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-50" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-500 transform"
            enterFrom="-translate-y-full"
            enterTo="translate-y-0"
            leave="transition ease-in-out duration-500 transform"
            leaveFrom="translate-y-0"
            leaveTo="-translate-y-full"
          >
            <Dialog.Panel className="absolute inset-y-0 right-0 z-50 w-full overflow-y-auto bg-neutral-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5 w-44">
                  <img
                    className="img-fluid"
                    src="/logo2.webp"
                    alt="Logo Chevronar"
                    loading="lazy"
                  />
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-400"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Cerrar menú"
                >
                  <span className="sr-only">Cerrar menú</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {token && role === "user"
                      ? navigationUserMobile.map((item) =>
                          item.name === "Cerrar sesión" ? (
                            <button
                              key={item.name}
                              onClick={logOut}
                              aria-label={item.name}
                              className="block text-base font-semibold leading-7 w-full text-start text-neutral-100 hover:bg-neutral-700 hover:text-white rounded-md px-2 py-1 text-md  no-underline"
                            >
                              {item.name}
                            </button>
                          ) : (
                            <Link
                              key={item.name}
                              to={item.to}
                              onClick={handleClick}
                              className={`block text-base font-semibold leading-7 text-neutral-100 hover:bg-neutral-700 hover:text-white rounded-md px-2 py-1 text-md  no-underline ${
                                pathname === item.to
                                  ? "text-white bg-neutral-800"
                                  : "text-neutral-100 hover:bg-neutral-700 hover:text-white"
                              }`}
                            >
                              {item.name}
                            </Link>
                          )
                        )
                      : token && role === "admin"
                      ? navigationAdminMobile.map((item) =>
                          item.name === "Cerrar sesión" ? (
                            <button
                              key={item.name}
                              onClick={logOut}
                              aria-label={item.name}
                              className="block text-base font-semibold leading-7 w-full text-start text-neutral-100 hover:bg-neutral-700 hover:text-white rounded-md px-2 py-1 text-md  no-underline"
                            >
                              {item.name}
                            </button>
                          ) : (
                            <Link
                              key={item.name}
                              to={item.to}
                              onClick={handleClick}
                              className={`block text-base font-semibold leading-7 text-neutral-100 hover:bg-neutral-700 hover:text-white rounded-md px-2 py-1 text-md  no-underline ${
                                pathname === item.to
                                  ? "text-white bg-neutral-800"
                                  : "text-neutral-100 hover:bg-neutral-700 hover:text-white"
                              }`}
                            >
                              {item.name}
                            </Link>
                          )
                        )
                      : navigationMobile.map((item) => (
                          <Link
                            key={item.name}
                            to={item.to}
                            onClick={handleClick}
                            className={`block text-base font-semibold leading-7 text-neutral-100 hover:bg-neutral-700 hover:text-white rounded-md px-2 py-1 text-md  no-underline ${
                              pathname === item.to
                                ? "text-white bg-neutral-800"
                                : "text-neutral-100 hover:bg-neutral-700 hover:text-white"
                            }`}
                          >
                            {item.name}
                          </Link>
                        ))}
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </header>
  );
};

export default NavbarComp;
