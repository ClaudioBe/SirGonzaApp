import axios from 'axios';

export const LOG_IN='LOG_IN';
export const LOG_OUT='LOG_OUT';

export const logIn=(password)=>async(dispatch)=>{
    await axios.post('/users',password).then(r=>
        dispatch({type:LOG_IN,payload:r.data}));
}

export const logOut=()=>async(dispatch)=>{
    return dispatch({type:LOG_OUT})
}