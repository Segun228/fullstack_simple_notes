import axios from "axios"
import { ACCESS_TOKEN } from "./config"
import { BASE_URL } from "./config"

const api = axios.create({
    baseURL: BASE_URL
})

api.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api