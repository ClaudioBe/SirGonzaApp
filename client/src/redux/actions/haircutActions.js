import axios from 'axios';

export const POST_HAIRCUT='POST_HAIRCUT';
export const GET_ALL_HAIRCUTS='GET_ALL_HAIRCUTS';
export const GET_HAIRCUTS_FOR_TYPE='GET_HAIRCUTS_FOR_TYPE';
export const GET_ALL_HAIRCUT_TYPES='GET_ALL_HAIRCUT_TYPES';
export const DELETE_HAIRCUT='DELETE_HAIRCUT';

export const postHaircut=(payload)=>async(dispatch)=>{
    return await axios.post('/haircuts',payload).then(r=>
        dispatch({type:POST_HAIRCUT,payload}))
}

export const getAllHaircuts=()=>async(dispatch)=>{
    return await axios('/haircuts').then(r=>
        dispatch({type:GET_ALL_HAIRCUTS, payload:r.data}))
}

export const getHaircutsForType=(haircutType)=>async(dispatch)=>{
    return await axios(`/haircuts/${haircutType}`).then(r=>
        dispatch({type:GET_HAIRCUTS_FOR_TYPE,payload:r.data}))
}

export const getAllHaircutTypes=()=>async(dispatch)=>{
    return await axios("/haircutTypes").then(r=>
        dispatch({type:GET_ALL_HAIRCUT_TYPES,payload:r.data}))
}

export const deleteHaircut=(id)=>async(dispatch)=>{
    return await axios.delete(`/haircuts/${id}`).then(r=>
        dispatch({type:DELETE_HAIRCUT}))
}