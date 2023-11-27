const PrivateRouteRecPass = ({ children }) => {
  const tokenPass = JSON.parse(localStorage.getItem("tokenPass"));

  if (tokenPass) return children;
  else location.href = "/login";
};

export default PrivateRouteRecPass;
