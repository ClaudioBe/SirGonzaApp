import{
    GET_ALL_APPOINTMENTS, 
    PUT_APPOINTMENT,
    POST_APPOINTMENT,
    DELETE_APPOINTMENT
} from "../actions/appointmentActions";

import {
    LOG_IN,
    LOG_OUT,
    GET_USERS,

} from "../actions/userActions";

const initialState={
    appointments:[],
    allAppointments:[],
    user:JSON.parse(localStorage.getItem("user")),
    users:[],
    admin:JSON.parse(localStorage.getItem("admin")),
    token:localStorage.getItem("token")
}

const rootReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_ALL_APPOINTMENTS:
            return{
                ...state,
                allAppointments:action.payload
            }

        case PUT_APPOINTMENT:
            return{
                ...state
            }

        case POST_APPOINTMENT:
            return {
                ...state
            }

        case DELETE_APPOINTMENT:
            return {
                ...state
            }


        case LOG_IN:
            localStorage.setItem("token",JSON.stringify(action.payload.token));
            localStorage.setItem("admin",JSON.stringify(action.payload.user.admin));
            localStorage.setItem('user',JSON.stringify(action.payload.user));
               
            return{
                ...state,
                token:action.payload.token,
                admin:action.payload.user.admin,
                user:action.payload.user
            }
            
        case LOG_OUT:
            localStorage.clear();

            return{
                ...state,
                token:null,
                admin:false,
                user:{}
            }
            
        case GET_USERS:
            return{
                ...state,
                users:action.payload
            }
            
        default: return{...state}
    }
}
export default rootReducer;