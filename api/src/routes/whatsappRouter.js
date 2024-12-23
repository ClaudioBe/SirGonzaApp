const {Router}=require('express');
const {sendCode, sendWhatsapp,getQrCode}=require('../controllers/whatsappControllers');

const whatsappRouter=Router();

whatsappRouter.post('/',async(req,res)=>{
    try {
        const message=await sendWhatsapp(req.body);
        res.status(200).json(message);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

whatsappRouter.get('/sendCode',async(req,res)=>{
    try {
        const code=await sendCode();
        res.status(200).json(code)
    } catch (error) {
        res.status(404).send(error.message);
    }
})

whatsappRouter.get('/getCode',async(req,res)=>{
    try {
        const qr= getQrCode();
        res.status(201).json(qr)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports={whatsappRouter};