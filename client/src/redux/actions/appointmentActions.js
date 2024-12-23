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
        dispatch({type:POST_APPOINTMENT})).catch(err=>{throw err.response.data});
}

export const putAppointment=(payload, id,token)=>async(dispatch)=>{
    return await axios.put(`/appointments/${id}/${token}`,payload).then(r=>
        dispatch({type:PUT_APPOINTMENT}));
}

export const deleteAppointment=(id,token)=>async(dispatch)=>{
    return await axios.delete(`/appointments/${id}/${token}`).then(r=>
        dispatch({type:DELETE_APPOINTMENT}));
}

export const sendMessage=(payload)=>async()=>{
    return await axios.post('/whatsapp',payload)
}