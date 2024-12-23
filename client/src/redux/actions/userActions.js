import axios from 'axios';

export const LOG_IN='LOG_IN';
export const SIGN_UP='SIGN_UP';
export const LOG_OUT='LOG_OUT';
export const GET_USERS='GET_USERS';
export const GET_USER_BY_ID='GET_USER_BY_ID';

export const logIn=(user)=>async(dispatch)=>{
    await axios.post('/users/logIn',user).then(r=>{
        dispatch({type:LOG_IN,payload:r.data})})
        .catch(error=>{throw error.response.data})
}


export const signUp=(user)=>async (dispatch)=>{
    await axios.post('/users/signUp',user).then(r=>
        dispatch({type:SIGN_UP}))
        //capturo el error para que me devuelva el objeto con los errores 
        .catch(error=>{throw error.response.data})
}

export const logOut=()=>async(dispatch)=>{
    return dispatch({type:LOG_OUT})
}

export const getUsers=(token)=>async(dispatch)=>{
    return await axios(`/users/${token}`).then(r=>
        dispatch({type:GET_USERS,payload:r.data}))
}

export const getUserById=(token)=>async(dispatch)=>{
    return await axios(`/users/${token}`).then(r=>
        dispatch({type:GET_USER_BY_ID,payload:r.data}))
}