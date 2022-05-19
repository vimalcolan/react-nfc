import React,{useState} from 'react'
import Header from '../Common/Header'
import Sidebar from '../Common/Sidebar'
import './Common.css'


const Dashboard = () => {
    const [togglemenu,setTogglemenu]=useState(false);
    const handleMenu=()=>{
        setTogglemenu(!togglemenu);
    }
  return (
    <>
    <div className='dashboard'>
       <Header handleMenu={handleMenu}/>
       <div className='page-wrapper d-flex'>
           <Sidebar toggle={togglemenu}/>
           <div className='main-page'>
               <div className='overview'><h4>Overview</h4></div>

           </div>
           
       </div>
    </div>
    </>
  )
}

export default Dashboard