import{
    GET_ALL_APPOINTMENTS, 
    PUT_APPOINTMENT,
    POST_APPOINTMENT,
    DELETE_APPOINTMENT
} from "../actions/appointmentActions";

import{ 
    GET_ALL_HAIRCUTS,
    GET_HAIRCUTS_FOR_TYPE,
    GET_ALL_HAIRCUT_TYPES,
    DELETE_HAIRCUT
} from "../actions/haircutActions";

import{
    DELETE_CAROUSEL_IMAGE,
    GET_ALL_CAROUSEL_IMAGES, POST_CAROUSEL_IMAGE
} from '../actions/carouselImageActions';

import {
    LOG_IN,
    LOG_OUT
} from "../actions/userActions";

const initialState={
    appointments:[],
    allAppointments:[],
    haircuts:[],
    allHaircuts:[],
    haircutTypes:[],
    carouselImages:[],
    isLogged:JSON.parse(localStorage.getItem("isLogged"))
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

        case GET_ALL_HAIRCUTS:
            return{
                ...state,
                allHaircuts:action.payload,
                haircuts:action.payload
            }

        case GET_HAIRCUTS_FOR_TYPE:
            return{
                ...state,
                haircuts:action.payload
            }

        case GET_ALL_HAIRCUT_TYPES:
            return{
                ...state,
                haircutTypes:action.payload
            }
        
        case DELETE_HAIRCUT:
            return{
                ...state
            } 
        
        case GET_ALL_CAROUSEL_IMAGES:
            return{
                ...state,
                carouselImages: action.payload
            }

        case POST_CAROUSEL_IMAGE:
            return {
                ...state
            }
        
        case DELETE_CAROUSEL_IMAGE:
            return{
                ...state
            }

        case LOG_IN:
            localStorage.setItem("isLogged",action.payload)
            return{
                ...state,
                isLogged: action.payload
            }
        
        case LOG_OUT:
            localStorage.clear();
            return{
                ...state,
                isLogged:false
            }

        default: return{...state}
    }
}
export default rootReducer;