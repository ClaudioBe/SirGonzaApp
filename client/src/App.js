import React from 'react';
import axios from "axios";
import {Route,Routes} from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import Home from './components/Home/Home';
import LogIn from './components/LogIn/LogIn'
import NavBar from './components/NavBar/NavBar';
import CreateAppointment from './components/CreateAppointment/CreateAppointment';
import DashboardAdmin from './components/DashboardAdmin/DashboardAdmin';
import { useSelector } from 'react-redux';
import Haircuts from './components/Haircuts/Haircuts';

axios.defaults.baseURL="http://localhost:3001/";

function App() {
  const a = useSelector(state=>state.isLogged);
  console.log(a);
  return (
    <div> 
      <NavBar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/Turnos' element={<CreateAppointment/>}/>
        <Route exact path='/Cortes' element={<Haircuts/>}/>
        <Route exact path='/IniciarSesion' element={<LogIn/>}/>
        <Route
          path="/Admin/Panel"
          element={
            <ProtectedRoute isAllowed={JSON.parse(localStorage.getItem("isLogged"))} redirectTo={"/IniciarSesion"}>
              <DashboardAdmin/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App;
