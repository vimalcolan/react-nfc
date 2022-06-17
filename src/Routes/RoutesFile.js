import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from '../Components/Login/Login'
import Dashboard from '../Components/Dashboard'
import ForgotPwd from '../Components/Login/ForgotPwd';
import ResetPwd from '../Components/Login/ResetPwd';
import ManageContact from '../Components/ManageContact';
import AddContact from '../Components/AddContact';
import Reports from '../Components/Reports';
import ViewContact from '../Components/ViewContact';
import EditContact from '../Components/EditContact'; 




const RoutesFile = () => {
 
 

  return (
    <>
      <BrowserRouter>
       <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Dashboard/>} />
        <Route  path='/forgot' element={<ForgotPwd/>} />
        <Route  path='/reset' element={<ResetPwd/>} />
        <Route  path='/manage-contact' element={<ManageContact/>}/>
        <Route path='/add-contact' element={<AddContact/>} />
        <Route path='/reports' element={<Reports/>} />
        <Route path='/view-contact' element={<ViewContact/>} />
        <Route path='/edit-contact' element={<EditContact/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default RoutesFile