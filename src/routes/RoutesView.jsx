import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "../components/PrivateRoutes";
import PrivateRouteRecPass from "../components/PrivateRouteRecPass";

const CartPage = lazy(() => import("../pages/CartPage"));
const AdminPage = lazy(() => import("../pages/AdminPage"));
const BuyOrdersPage = lazy(() => import("../pages/BuyOrdersPage"));
const NewUserPassPage = lazy(() => import("../pages/NewUserPassPage"));
const OneProductPage = lazy(() => import("../pages/OneProductPage"));
const MailRecoveryPassPage = lazy(() =>
  import("../pages/MailRecoveryPassPage")
);
const ConfirmMailPage = lazy(() => import("../pages/ConfirmMailPage"));
const ProductsPage = lazy(() => import("../pages/ProductsPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const Contact = lazy(() => import("../pages/Contact"));
const Homepage = lazy(() => import("../pages/Homepage"));
const Errorpage = lazy(() => import("../pages/Errorpage"));

const RoutesView = () => {
  return (
    <Suspense>
      <Routes>
        <Route
          path="/cart"
          element={
            <PrivateRoutes role={"user"}>
              <CartPage />
            </PrivateRoutes>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoutes role={"admin"}>
              <AdminPage />
            </PrivateRoutes>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoutes role={"user"}>
              <BuyOrdersPage />
            </PrivateRoutes>
          }
        />
        <Route
          path="/newUserPass"
          element={
            <PrivateRouteRecPass>
              <NewUserPassPage />
            </PrivateRouteRecPass>
          }
        />
        <Route path="/product/:id" element={<OneProductPage />} />
        <Route
          path="/sendMailRecoveryPass"
          element={<MailRecoveryPassPage />}
        />
        <Route path="/confirm" element={<ConfirmMailPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </Suspense>
  );
};
// const RoutesView = () => {
//   return (
//     <Routes>
//       <Route
//         path="/cart"
//         element={
//           <PrivateRoutes role={"user"}>
//             <CartPage />
//           </PrivateRoutes>
//         }
//       />
//       <Route
//         path="/admin"
//         element={
//           <PrivateRoutes role={"admin"}>
//             <AdminPage />
//           </PrivateRoutes>
//         }
//       />
//       <Route
//         path="/orders"
//         element={
//           <PrivateRoutes role={"user"}>
//             <BuyOrdersPage />
//           </PrivateRoutes>
//         }
//       />
//       <Route
//         path="/newUserPass"
//         element={
//           <PrivateRouteRecPass>
//             <NewUserPassPage />
//           </PrivateRouteRecPass>
//         }
//       />
//       <Route path="/newUserPass" element={<NewUserPassPage />} />
//       <Route path="/product/:id" element={<OneProductPage />} />
//       <Route path="/sendMailRecoveryPass" element={<MailRecoveryPassPage />} />
//       <Route path="/confirm" element={<ConfirmMailPage />} />
//       <Route path="/products" element={<ProductsPage />} />
//       <Route path="/register" element={<RegisterPage />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/contact" element={<Contact />} />
//       <Route path="/" element={<Homepage />} />
//       <Route path="*" element={<Errorpage />} />
//       <Route />
//     </Routes>
//   );
// };

export default RoutesView;
