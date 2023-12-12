import{
    GET_ALL_APPOINTMENTS,
    GET_ALL_HAIRCUTS,
    GET_HAIRCUTS_FOR_TYPE,
    GET_ALL_HAIRCUT_TYPES,
    GET_HAIRCUT_TYPE_BY_ID
} from "../actions";

const initialState={
    appointments:[],
    haircuts:[],
    allHaircuts:[],
    haircutType:{},
    haircutTypes:[]
}

const rootReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_ALL_APPOINTMENTS:
            return{
                ...state,
                appointments:action.payload
            }
        case GET_ALL_HAIRCUTS:
            return{
                ...state,
                allHaircuts:action.payload
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
        case GET_HAIRCUT_TYPE_BY_ID:
            return{
                ...state,
                haircutType:action.payload
            }
        default: return{...state}
    }
}
export default rootReducer;