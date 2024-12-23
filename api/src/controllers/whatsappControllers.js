const {client,qrCode}=require('../utils/whatsapp');

const sendWhatsapp=async ({phoneNumber,message})=>{
    const chatId = phoneNumber.substring(1) + "@c.us";
    const number_details=client.getNumberId(chatId);
    if(number_details) return await client.sendMessage(chatId,message);
}

const sendCode=async(phoneNumber)=>{
    //Math.random() devuelve un numero random entre 0 y 1 lo multiplico por 900 
    //y lo redondeo para abajo para que sea de 3 cifras, ademas de sumarle 100 para
    //que pueda ser hasta el 999
    const code= Math.floor(Math.random()*900)+100;
    await sendWhatsapp(phoneNumber,`Codigo: ${code}`)
    return code;
}

const getQrCode=()=>{
    return qrCode;
}

module.exports={sendWhatsapp,sendCode,getQrCode};