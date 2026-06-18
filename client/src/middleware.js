import { NextResponse } from "next/server";

export function middleware(request) {
    // obtengo la cookie 'user' que se crea al iniciar sesion
    const userCookie = request.cookies.get("user")?.value;
    
    // ruta actual del Front a la que intenta acceder
    const { pathname } = request.nextUrl;

    const rutas=["/", "/Turnos", "/IniciarSesion", "/Registrarse"];
    //Si está logueado e intenta ir a otras ruta, se le redirige a Perfil
    if (userCookie && rutas.some(r=>pathname===r)) {
        return NextResponse.redirect(new URL("/Perfil", request.url));
    }

    // Si NO está logueado e intenta ir a Perfil, va a la home
    
    if (!userCookie && pathname === "/Perfil") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

//rutas donde se ejecutará este Middleware
export const config = {
    matcher: ["/", "/Perfil", "/Turnos","/Registrarse", "/IniciarSesion"],
};
