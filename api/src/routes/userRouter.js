const {Router} =require('express');
const {logIn, signUp, getUsers, editProfile, getUser, changePassword, createAdmin,
deleteUser}=require('../controllers/usersControllers');
const {verifyTokenAdmin,verifyTokenProfile}=require('../middlewares/authJwt');

const userRouter=Router();


//ruta post para loguearse
userRouter.post('/logIn',async(req,res)=>{
    try {
        const result=await logIn(req.body);
        const{password,...publicUser}=result.user;
        res
            .cookie('access_token',result.token,{
                httpOnly:true //la cookie solo se puede acceder desde el servidor
            })
            .status(201).json(publicUser);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

//ruta post para registrarse
userRouter.post('/signUp',async(req,res)=>{
    try {
        const user =await signUp(req.body);
        const{password,admin,...publicUser}=result.user;
        res.status(200).json(publicUser);
    } catch (error) {
        //parseo el string a Object para poder manejarlo despues en la action..
        res.status(400).json(error.message);
    }
})

//ruta post para registrar al admin
userRouter.post('/admin',async(req,res)=>{
       try {
           const user = await createAdmin(req.body)
           res.status(200).json(user);
       } catch (error) {
           res.status(400).json(JSON.parse(error.message))
       }
})

//ruta put para editar perfil
userRouter.put('/edit/:id',verifyTokenProfile,async(req,res)=>{
    try {
        const userUpdated=await editProfile(req.body,req.params.id);
        const{password,admin,...publicUser}=userUpdated;
        res.status(200).json(publicUser)
    } catch (error) {
        res.status(400).json(error.message);
    }
})

//ruta put para cambiar la contraseña
userRouter.put('/changePassword/:id',verifyTokenProfile,async(req,res)=>{
    try {
        const response=await changePassword(req.body,req.params.id);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error.message);
    }
})

//ruta get de admin para solicitar los datos de los usuarios
userRouter.get('/admin',verifyTokenAdmin,async (req,res)=>{
    try {
        const users=await getUsers();
        res.status(201).json(users)
    } catch (error) {
        res.status(404).send(error.message);
    }
})

//ruta get para solicitar los datos del usuario con el id pasado por params
userRouter.get('/:id',verifyTokenProfile,async(req,res)=>{
    try {
        const user=await getUser(req.params.id);
        res.status(201).json(user)
    } catch (error) {
        res.status(404).send(error.message);
    }
})

//ruta delete para que el admin elimine al usuario con el id pasado por params
userRouter.delete('/admin/:id',verifyTokenAdmin,async(req,res)=>{
    try {
        const response=await deleteUser(req.params.id);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//ruta para que los usuarios puedan eliminar su cuenta
userRouter.delete('/:id',verifyTokenProfile,async(req,res)=>{
    try {
        const response=await deleteUser(req.params.id);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports={userRouter};