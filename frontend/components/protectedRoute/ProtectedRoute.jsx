import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"
import api from "../../api";
import {REFRESH_TOKEN, ACCESS_TOKEN} from "./../../config"
import { children, useEffect, useState } from "react";

const ProtectedRoute = ({children}) => {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(()=>{
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const handleRefreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        if(!refreshToken){
            return false
        }
        try{
            const response = api.post(
                "/api/token/refresh/", 
                {refresh: refreshToken}
            )
            if(response.status == 200){
                localStorage.setItem(ACCESS_TOKEN, (await response).data.access)
                setIsAuthorized(true)
            }
            else{
                setIsAuthorized(false)
            }

        }
        catch(error){
            console.error(error)
            setIsAuthorized(false)
        }
    }

    const auth = async () => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN)
        if(!accessToken){
            setIsAuthorized(false)
            return
        }
        const decodedAccessToken = jwtDecode(accessToken)
        const tokenExpirationDate = decodedAccessToken.exp
        const currentDate = Date.now() / 1000
        
        if(tokenExpirationDate < currentDate){
            const result = await handleRefreshToken()
            if(!result){
                setIsAuthorized(false)
                return
            }
        }
        else{
            setIsAuthorized(true)
        }
    }

    if(isAuthorized === null){
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute