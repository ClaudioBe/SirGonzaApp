import StoreProvider from "@/redux/StoreProvider";
import NavBar from "./NavBar";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css";
import RestoreSession from "./RestoreSession";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <title>Sir Gonza</title>
      <body>
        <StoreProvider>
          <RestoreSession/>
          <NavBar/>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
