const jwt =require('jsonwebtoken');
const {User}=require('../db');

const verifyToken=(admin)=>async (req,res,next)=>{
    try {
        const token=req.params.token;
        //si no se pasa un token por parametro...
        if(!token) return res.status(400).send("No hay token");
    
        //decoded tiene el id del usuario, ya que el token fue generado con este id 
        const decoded=jwt.verify(token,process.env.SECRET);
        
        const user=await User.findByPk(decoded.id);

        if(!user) return res.status(404).send("El usuario no existe");

        //si es para ls rutas que requieren ser administrador y el usuario no lo es:...
        if(admin) {if(!user.admin) return res.status(400).send("Necesita permisos de administrador")}

        //si es para la ruta para editar el usuario y no es el perfil del usuario logueado:...
        else if(user.id!=req.params.id) return res.status(400).send("Este no es su usuario");
        
        next()
    
    } catch (error) {
        res.status(400).send("No autorizado");
    }
}
const verifyTokenAdmin= verifyToken(true);

const verifyTokenProfile=verifyToken(false);

module.exports ={verifyTokenAdmin,verifyTokenProfile}