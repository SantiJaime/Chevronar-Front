const PrivateRoutes = ({ children, role }) => {
    const token = JSON.parse(sessionStorage.getItem("token"))
    const roleLS = JSON.parse(sessionStorage.getItem("role"))

    if(token){
        if(role === roleLS) return children
        else{
            if(roleLS === "admin") location.href = "/admin"
            else location.href = "/"
        }
    }
    else location.href = "/login"
}

export default PrivateRoutes;
