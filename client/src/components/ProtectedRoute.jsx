import {Navigate} from "react-router-dom";

export const ProtectedRoute =({isAllowed,children,redirectTo})=>{
    //Si el administrador no inicio sesion..
    if(!isAllowed) return <Navigate to={redirectTo}/>
    
    return children;
}