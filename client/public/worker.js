
//self hace referencia a este mismo archivo
//esto es para que se mantenga escuchando el evento push el cual es llamado 
//en el servidor con web-push
self.addEventListener('push',e=>{
    //los datos recibidos lo convierto a json
    const data=e.data.json()
    console.log(data);
    
    console.log("Notificacion recibida");
    self.registration.showNotification(data.title,{
        body:data.message,
        icon:"https://www.google.com/imgres?q=reloj%20&imgurl=https%3A%2F%2Fimg.freepik.com%2Fvector-gratis%2Fcuenta-atras-fecha-limite-reloj-moderno_24877-81802.jpg%3Fsemt%3Dais_rp_progressive%26w%3D740%26q%3D80&imgrefurl=https%3A%2F%2Fwww.freepik.es%2Ffotos-vectores-gratis%2Freloj-ilustracion&docid=Lklpi4TusdRz-M&tbnid=sf4JOj36KeOt3M&vet=12ahUKEwjYm-Cn7KyTAxUoHrkGHUb-Mu8QnPAOegQIGBAB..i&w=740&h=740&hcb=2&ved=2ahUKEwjYm-Cn7KyTAxUoHrkGHUb-Mu8QnPAOegQIGBAB"
    })  
})