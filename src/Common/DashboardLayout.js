import React,{useState} from 'react'
import Header from './Header';
import Sidebar from './Sidebar';



const DashboardLayout = (props) => {
    const [togglemenu, setTogglemenu] = useState(false);
    const handleMenu = () => {
      setTogglemenu(!togglemenu);
    };
  return (
    <>
     <div className='dashboard'>
     <Header  handleMenu={handleMenu} title={props.title} />
     <div className='page-wrapper d-flex'>
       <Sidebar toggle={togglemenu} pageId={props.pageId}/>
       <div className='main-page'>
           {props.children}
       </div>
     </div>
   </div>

    </>
  )
}

export default DashboardLayout