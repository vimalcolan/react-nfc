import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Login from './Components/Login/Login'
import Dashboard from './Common/Dashboard'
import ForgotPwd from './Components/Login/ForgotPwd';
import ResetPwd from './Components/Login/ResetPwd';

function App() {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Dashboard/>}/>
        <Route  path='/forgot' element={<ForgotPwd/>}/>
        <Route  path='/reset' element={<ResetPwd/>}/>
      </Routes>
    </Router>

    </>
  );
}

export default App;
