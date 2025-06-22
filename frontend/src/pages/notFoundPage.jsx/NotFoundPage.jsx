import { Cat404 } from "@404pagez/react";
import { useNavigate } from "react-router-dom";
import "./notFoundPage.css"
const NotFoundPage = () => {
    const navigate = useNavigate();
    return ( 
    <>
        <div className="notFoundPage__wrapper">
            <Cat404 size={40} isButton={true} buttonLabel="Go home" onButtonClick={()=>{navigate("/")}}/>
        </div>
    </>);
}

export default NotFoundPage;