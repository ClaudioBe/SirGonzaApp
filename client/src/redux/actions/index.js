import axios from 'axios';

export const GET_ALL_APPOINTMENTS='GET_ALL_APPOINTMENTS';
export const POST_APPOINTMENT='POST_APPOINTMENT';
export const PUT_APPOINTMENT='PUT_APPOINTMENT';

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