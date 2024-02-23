import axios from 'axios';

export const GET_ALL_CAROUSEL_IMAGES='GET_ALL_CAROUSEL_IMAGES';
export const POST_CAROUSEL_IMAGE='POST_CAROUSEL_IMAGE';
export const DELETE_CAROUSEL_IMAGE='DELETE_CAROUSEL_IMAGE';

export const getAllCarouselImages=()=>async (dispatch)=>{
    return await axios('/carouselImages').then(r=>
        dispatch({type:GET_ALL_CAROUSEL_IMAGES,payload:r.data}))
}

export const postCarouselImage=(payload)=>async(dispatch)=>{
    return await axios.post('/carouselImages',payload).then(r=>
        dispatch({type:POST_CAROUSEL_IMAGE}));
}

export const deleteCarouselImage=(id)=>async(dispatch)=>{
    return axios.delete(`/carouselImages/${id}`).then(r=>{
        dispatch({type:DELETE_CAROUSEL_IMAGE});
    })
}