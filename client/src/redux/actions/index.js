import axios from 'axios';

export const GET_ALL_APPOINTMENTS='GET_ALL_APPOINTMENTS';
export const POST_APPOINTMENT='POST_APPOINTMENT';
export const PUT_APPOINTMENT='PUT_APPOINTMENT';
export const POST_HAIRCUT='POST_HAIRCUT';
export const GET_ALL_HAIRCUTS='GET_ALL_HAIRCUTS';
export const GET_HAIRCUTS_FOR_TYPE='GET_HAIRCUTS_FOR_TYPE';
export const GET_ALL_HAIRCUT_TYPES='GET_ALL_HAIRCUT_TYPES';
export const GET_HAIRCUT_TYPE_BY_ID='GET_HAIRCUT_TYPE_BY_ID';
export const LOGIN='LOGIN';

export const getAllAppointments=()=>async(dispatch)=>{
    return await axios('/appointments').then(r=>
        dispatch({type:GET_ALL_APPOINTMENTS, payload:r.data}))
}

export const postAppointments=(payload)=>async()=>{
    return await axios.post('/appointments',payload)
}

export const putAppointment=(payload, id)=>async()=>{
    return await axios.put(`/appointments/${id}`,payload)
}

export const postHaircut=(payload)=>async()=>{
    return await axios.post('/haircuts',payload)
}

export const getAllHaircuts=()=>async(dispatch)=>{
    return await axios('/haircuts').then(r=>
        dispatch({type:GET_ALL_HAIRCUTS, payload:r.data}))
}

export const getHaircutsForTYPE=(haircutType)=>async(dispatch)=>{
    return await axios(`/haircuts/${haircutType}`).then(r=>
        dispatch({type:GET_HAIRCUTS_FOR_TYPE,payload:r.data}))
}

export const getAllHaircutTypes=()=>async(dispatch)=>{
    return await axios("/haircutTypes").then(r=>
        dispatch({type:GET_ALL_HAIRCUT_TYPES,payload:r.data}))
}

export const getHaircutTypeById=(id)=>async(dispatch)=>{
    return await axios(`/haircutTypes/${id}`)
}

export const login=(password)=>async()=>{
    return await axios.post('/users',password);
}