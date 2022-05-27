import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Login from '../Components/Login/Login'
import Dashboard from '../Common/Dashboard'
import ForgotPwd from '../Components/Login/ForgotPwd';
import ResetPwd from '../Components/Login/ResetPwd';
import ManageContact from '../Components/ManageContact';
import AddContact from '../Components/AddContact';
import Reports from '../Components/Reports';

const RoutesFile = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Dashboard/>}/>
        <Route  path='/forgot' element={<ForgotPwd/>}/>
        <Route  path='/reset' element={<ResetPwd/>}/>
        <Route  path='/manage-contact' element={<ManageContact/>}/>
        <Route path='/add-contact' element={<AddContact/>} />
        <Route path='/reports' element={<Reports/>} />
      </Routes>
    </Router>

    </>
  )
}

export default RoutesFile