

export const getQrCode=()=>async()=>{
    return await axios('/whatsapp').then(r=>r.data)
}