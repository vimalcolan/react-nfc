import React,{useState} from "react";
import '../Common/Common.css'
import logo from '../assets/images/NFC-logo.png'
import menu from '../assets/images/hamburger-menu.png'
import notificationsEnabled from '../assets/images/notifications-enabled.png'
import profilePic from '../assets/images/profile-icon.png'
import dropdown from '../assets/images/profile-dropdown.png'
import { useNavigate } from "react-router-dom";


const Header = ({handleMenu,title}) => {
  const navigate=useNavigate();
  const [profilehide, setprofilehide] = useState(true);
  const profilehidehandler=()=>{
    setprofilehide(!profilehide);
  }
 
  return (
    <>
      <div className="header d-flex justify-content-between align-items-center">
        <div className="left-part d-flex">
          <div className="d-flex align-items-center brand-wrapper">
            <div className="logo-wrapper me-1"><img src={logo} alt="logo" /></div>
            <div className="logo-name">NFC BUISNESS<span className="logo-name-card"> CARD</span></div>
          </div>
          <div className="d-flex">
            <div className="menu-icon d-flex align-items-center">
              <img className="mx-2" src={menu} alt="menu" onClick={handleMenu} />
              <span>{title}</span>
            </div>
          </div>
        </div>
        <div className="right-part d-flex align-items-center">
          <div className="notifications">
            <img src={notificationsEnabled} alt="notification" />
          </div>
          <div className="profile-wrapper d-flex">
            <div className="profile-img me-2">
              <img src={profilePic} alt="profile" />
            </div>
            <div className="profile-details">
              <div className="d-flex" ><span className="profile-name text-white">Chris HermsWorth</span><span className="ms-2"><img src={dropdown} alt="dropdown" onClick={profilehidehandler}/></span> </div>
              <div className="desg">Super Admin</div>
            </div>
            <div className={profilehide?"hided-profile":"hided-profile show"}>
            <div className="profile-details">
              <div className="d-flex" ><span className="profile-name text-white">Chris HermsWorth</span></div>
              <div className="desg">Super Admin</div>
              <button className="btn btn-success" onClick={()=>{navigate('/login')}}>logout</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
