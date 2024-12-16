import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api"
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../constants"
import { useState, useEffect } from "react"

function ProtectedRoute({children}){
    const [isAuthorized,setAuthorized] = useState(null)
    
    useEffect(()=>{
        auth().catch(()=> setAuthorized(false))
        },[]
    )

    const refreshToken = async ()=>{
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
// sending a request to the backend with the refresh token to get new access token
            const res = await api.post("/api/token/refresh/",{
                refresh:refreshToken,
            });
            if (res.status ===200){
                //updating the access token
                localStorage.setItem(ACCESS_TOKEN,res.data.access)
                setAuthorized(true)
            }else{
                setAuthorized(false)
            }
        }catch(error){
            console.log(error)
            setAuthorized(false)
        }

    }
    const auth = async () =>{
        // check if the token exist
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            // if not exist then return the usestate to false
            setAuthorized(false)
            return 
        }
        // if the token exist 
        const decoded =jwtDecode(token)
        const tokenExpiration =decoded.exp
        const now = Date.now()/1000
        // if the token is expired go to refresh function 
        if (tokenExpiration < now){
            await refreshToken()
        }else{
        // if the token is not expired then it is authorized so usetate to true
            setAuthorized(true)
        }

    }

    if (isAuthorized === null){
        return <div> Loading.... </div>
    }
    
    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute