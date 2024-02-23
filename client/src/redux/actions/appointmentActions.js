import axios from 'axios';

export const GET_ALL_APPOINTMENTS='GET_ALL_APPOINTMENTS';
export const POST_APPOINTMENT='POST_APPOINTMENT';
export const PUT_APPOINTMENT='PUT_APPOINTMENT';
export const DELETE_APPOINTMENT='DELETE_APPOINTMENT';

export const getAllAppointments=()=>async(dispatch)=>{
    return await axios('/appointments').then(r=>
        dispatch({type:GET_ALL_APPOINTMENTS, payload:r.data}));
}

export const postAppointments=(payload)=>async(dispatch)=>{
    return await axios.post('/appointments',payload).then(r=>
        dispatch({type:POST_APPOINTMENT}));
}

export const putAppointment=(payload, id)=>async(dispatch)=>{
    return await axios.put(`/appointments/${id}`,payload).then(r=>
        dispatch({type:PUT_APPOINTMENT}));
}

export const deleteAppointment=(id)=>async(dispatch)=>{
    return await axios.delete(`/appointments/${id}`).then(r=>
        dispatch({type:DELETE_APPOINTMENT}));
}