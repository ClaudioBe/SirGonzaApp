import React from 'react';
import {Route,Routes} from 'react-router-dom';
import Home from './components/Home/Home';
import Haircuts from './components/Haircuts/Haircuts';
import Login from "./components/Login/Login";
import NavBar from './components/NavBar/NavBar';
import Appointment from './components/Appointment/Appointment';
import axios from "axios";

axios.defaults.baseURL="http://localhost:3001/";

function App() {
  
  return (
    <div> 
      <NavBar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/Cortes' element={<Haircuts/>}/>
        <Route exact path='/Turnos' element={<Appointment/>}/>
        <Route exact path='/IniciarSesion' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App;
