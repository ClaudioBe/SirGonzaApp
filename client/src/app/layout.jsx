import StoreProvider from "@/redux/StoreProvider";
import NavBar from "./NavBar";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css";
import RestoreSession from "./RestoreSession";
import Footer from "./Footer";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({ children }) {
    

    return (
        <html lang="en">
            <head>
                <title>Sir Gonza</title>
                <link style={{borderRadius:"50%"}} rel="icon" href="/assets/icon.png" type="image/png" />
            </head>
      
            <body>
                <StoreProvider>
                    <RestoreSession/>
                    <NavBar/>
                        <NextTopLoader color="#1eca00"/>
                        <main>
                           {children}  
                        </main>
                        
                    <Footer/>
                </StoreProvider>
            </body>

        </html>
  );
}
