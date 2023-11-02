import{
    GET_ALL_APPOINTMENTS,
} from "../actions";

const initialState={
    appointments:[],
}

const rootReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_ALL_APPOINTMENTS:
            return{
                ...state,
                appointments:action.payload
            }
        default: return{...state}
    }
}
export default rootReducer;