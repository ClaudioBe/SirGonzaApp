import React from 'react';
import axios from "axios";
import {Route,Routes} from 'react-router-dom';
// import { ProtectedRoute } from './components/ProtectedRoute';
import Home from './components/Home/Home';
import LogIn from './components/LogIn/LogIn'
import NavBar from './components/NavBar/NavBar';
import CreateAppointment from './components/CreateAppointment/CreateAppointment';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';

axios.defaults.baseURL="http://localhost:3001/";

function App() {
  
  return (
    <div> 
      <NavBar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/Turnos' element={<CreateAppointment/>}/>
        <Route exact path='/IniciarSesion' element={<LogIn/>}/>
        <Route exact path='/Registrarse' element={<Register/>}/>
        <Route exact path='/Perfil' element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default App;
