import { useState } from "react";
import api from "../../../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../config";
import styles from "./form.module.css"
import AnimatedContent from './../../AnimatedContent/AnimatedContent/AnimatedContent.jsx'
import ActionButton from "../actionButton/ActionButton.jsx";
import { Link } from "react-router-dom";

const Form = ({route, method}) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState("")
    const [foundError, setFoundError] = useState(null)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try{
            const result = await api.post(route, {username, password})
            console.log(result.data)
            if(method == "login"){
                localStorage.setItem(ACCESS_TOKEN, result.data.access)
                localStorage.setItem(REFRESH_TOKEN, result.data.refresh)
                navigate("/")
            }
            else{
                navigate("/login")
            }
        }
        catch(error){
            setFoundError(true)
            console.error(error)
        }
        finally{
            setLoading(false)
        }
    }

    const name = method === "login" ? "Log in" : "Register"

return (
    <div className={styles.wrapper}>
        <AnimatedContent className={styles.animated}>
            <div className={styles['form-section']} onClick={() => {setFoundError(false)}}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.subtitle}>{name}</div>
                    <input
                        type='text'
                        name='username'
                        placeholder='Enter your username...'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type='text'
                        name='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <ActionButton type="submit">{loading ? "Loading..." : name}</ActionButton>
                    {foundError &&
                        <div className={styles.error}>Something went wrong</div>
                    }
                    {
                        (method == "login") &&
                        <Link to="/register"><div className={styles.subcaption}>Or register here</div></Link>
                    }
                    {
                        (method == "register") &&
                        <Link to="/login"><div className={styles.subcaption}>Or login here</div></Link>
                    }
                </form>
            </div>
        </AnimatedContent>

        
    </div>
)
}

export default Form;