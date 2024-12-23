const {User}=require('../db');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');

const regexLetters = RegExp(/^[A-Za-z\s]+$/);
const secret = process.env.SECRET;

//funcion para encriptar la contraseña pasada por parametro
const encryptPassword=async (password)=>{
    //retorna un hash que crea el metodo hash() de bcrypt,
    //pasandole el string a encriptar y la cantidad de saltos por parametro
    return await bcrypt.hash(password, 10);
}

const comparePassword=async(password,hash)=>{
    return await bcrypt.compare(password,hash)
}

const generateAccessToken=async(id)=>{
    return await jwt.sign({id}, secret,{
        expiresIn:86400 //24 horas
    })
}

const logIn=async({userName, password})=>{
    const errors={}
    let user=null;
    if(userName=="") errors.userName="Debe ingresar su nombre de usuario";
    else {
        user=await User.findOne({where:{userName}})
        if(!user) errors.userName="Nombre de usuario inexistente";
    }

    if(password=="") errors.password="Debe ingresar su contraseña";
    //si el usuario existe y el hash de la contraseña ingresada 
    //no coincide con el de la almacenada en la BBDD... 
    else if(user!=null && !await comparePassword(password, user.password))
        errors.password="Contraseña incorrecta";

    //si hay errores
    if(Object.keys(errors).length)throw Error(JSON.stringify(errors));

    //si la contraseña es correcta devuelve los datos del usuario y el token
    return {user,token:await generateAccessToken(user.id)}; 
}

const signUp=async({name,lastname,phoneNumber,userName,password})=>{
    const errors={}

    if(name=="") errors.name="Debe ingresar su nombre";
    else{
        if(!regexLetters.test(name))errors.name="El nombre solo debe contener letras";
        if(name.length<4)errors.name="Nombre demasiado corto";
        if(name.length>15) errors.name="Nombre demasiado largo";
    }

    if(lastname=="") errors.lastname="Debe ingresar su apellido";
    else{
        if(!regexLetters.test(lastname))errors.lastname="El apellido solo debe contener letras";
        if(lastname.length<3)errors.lastname="Apellido demasiado corto";
        if(lastname.length>15) errors.lastname="Apellido demasiado largo";
    } 
    
    if(userName=="") errors.userName="Debe ingresar su nombre de usuario";
    else{
        if(userName.length<5)errors.userName="Nombre de usuario demasiado corto";
        if(userName.length>15)errors.userName="Nombre de usuario demasiado largo";
        if(await User.findOne({where:{userName}})!=null) 
            errors.userName="Este nombre de usuario ya esta registrado";
    }
    

    if(phoneNumber.length==0) errors.phoneNumber="Debe ingresar su numero de celular";
    else{
        if(phoneNumber.length!=8) errors.phoneNumber="El numero debe ser de 8 digitos";
        else if(await User.findOne({where:{phoneNumber}})!=null) 
            errors.phoneNumber="Este numero ya esta registrado";
    }

    if(password.length==0) errors.password="Debe ingresar una contraseña";
    else{
        if(password.length<4) errors.password="Contraseña muy corta";
        else if(await User.findOne({where:{phoneNumber}})!=null) 
            errors.phoneNumber="Este numero ya esta registrado";
    }

    //si hay errores lanzo un error con el objeto errors parseado a string para que este quede..
    //en la prop 'message' de errors
    if(Object.keys(errors).length) throw Error(JSON.stringify(errors));
    const hash = await encryptPassword(password);
    await User.create({name,lastname,phoneNumber,userName,password:hash});
    return "Usuario creado";
} 
// const createAdmin=async({userName,password})=>{
//     const hash = await encryptPassword(password);
//     await User.create({userName,password:hash, admin:true});
//     return "Admin creado";
// }
const editProfile=async(user, id)=>{
    const errors={};
    if(user.name!=undefined){
        if(!regexLetters.test(user.name))errors.name="El nombre solo debe contener letras";
        if(user.name.length<4)errors.name="Nombre demasiado corto";
        if(user.name.length>15) errors.name="Nombre demasiado largo";
    }

    if(user.lastname!=undefined){
        if(!regexLetters.test(user.lastname))errors.lastname="El nombre solo debe contener letras";
        if(user.lastname.length<3)errors.lastname="Nombre demasiado corto";
        if(user.lastname.length>15) errors.lastname="Nombre demasiado largo";
    }

    if(user.userName!=undefined){
        if(userName.length<5)errors.userName="Nombre de usuario demasiado corto";
        if(userName.length>15)errors.userName="Nombre de usuario demasiado largo";
    }
   
    if(Object.keys(errors).length) throw Error(JSON.stringify(errors));

    console.log(user.admin);
    
    //si alguien quiere hacerse administrador...
    if(user.admin!=undefined) throw Error(JSON.stringify("No puede hacer eso!!"));
    const userToUpdate=await User.findByPk(id);
    
    //si alguien quiere cambiar su contraseña..
    if(user.password!=undefined) throw Error(JSON.stringify("No puede hacer eso!!"));
    return await userToUpdate.update(user);
}

const changePassword= async({oldPassword,newPassword,newPassword2},id)=>{
    const errors={};
    const userToUpdate=await User.findByPk(id);
    if(oldPassword=="") errors.oldPassword="Debe ingresar su antigua contraseña";
    if(newPassword=="") errors.newPassword="Debe ingresar su nueva contraseña";
    if(newPassword2=="") errors.newPassword2="Debe ingresar su nueva contraseña otra vez";
    if(newPassword!=newPassword2) errors.newPassword2="No ha ingresado la misma contraseña";

    if(newPassword==newPassword2 && await comparePassword(newPassword,userToUpdate.password)) 
        errors.oldPassword="Contraseña antigua incorrecta";

    if(Object.keys(errors).length) throw Error(JSON.stringify(errors));
    //finalmente, si no hay errores, actualizo la contraseña del usuario a 
    //la ingresada guardandola encriptada en la BBDD... 
    await userToUpdate.update({password:await encryptPassword(newPassword)})
    return "Contraseña actualizada con éxito";
}

//es para cuando el usuario quiera ver su perfil
const getUser=async(id)=>{
    return await User.findByPk(id);
}

const getUsers=async()=>{
    return await User.findAll({attributes:{exclude:['password']}, where:{admin:false}});
}

const deleteUser=async(id)=>{
    const userToDelete=await User.findByPk(id)
    if(userToDelete) await User.destroy({where:{id}})
    else throw Error(`No existe un usuario con el id ${id}`);

    return `El usuario ${id} ha sido eliminado`;
}

module.exports={
    logIn,
    signUp,
    getUsers,
    editProfile,
    getUser,
    /*createAdmin,*/
    changePassword,
    deleteUser
}