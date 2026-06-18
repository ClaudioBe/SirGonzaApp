import StoreProvider from "@/redux/StoreProvider";
import NavBar from "./NavBar";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css";
import RestoreSession from "./RestoreSession";
import Footer from "./Footer";

export default function RootLayout({ children }) {
    
    return (
        <html lang="en">
            <head>
                <title>Sir Gonza</title>
                <link rel="icon" href="/assets/icon.png" type="image/png" />
            </head>
      
            <body>
                <StoreProvider>
                    <RestoreSession/>
                    <NavBar/>
                    {children}
                    <Footer/>
                </StoreProvider>
            </body>

        </html>
  );
}
