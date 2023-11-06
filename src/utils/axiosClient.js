import axios from "axios";

const clientAxios = axios.create({
    baseURL: import.meta.env.VITE_URL_DEPLOY
})

const token = JSON.parse(sessionStorage.getItem("token"))

export const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}

export default clientAxios