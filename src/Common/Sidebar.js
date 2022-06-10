import React, {useEffect, useState } from "react";
import {AiOutlineDashboard} from 'react-icons/ai'
import {RiContactsBook2Line} from 'react-icons/ri'
import {BsFileSpreadsheet} from 'react-icons/bs'
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({toggle}) => {
  const navigate=useNavigate();
  const [addActive,setAddActive]=useState(1);

const sidebarData=[
  {id:1,icon:  <AiOutlineDashboard size={'30px'} color={"#6B6B6B"}/> ,name:"Dashboard" ,path:"/" },
  {id:2,icon:  <RiContactsBook2Line size={'30px'} color={"#6B6B6B"}/>,name:"Manage Contact",path:"/manage-contact"},
 {id:3,icon:  <BsFileSpreadsheet size={'30px'} color={"#6B6B6B"}/>,name:"Reports",path:"/reports"}
]


const handleMenu=(id,path)=>{

const filtered=sidebarData.filter((data)=>{
  if(data.id==id){
    // navigate(path); 
    sessionStorage.setItem("pageActive",id)
    return 
  }
});
// console.log("fil",filtered);
}

  useEffect(()=>{
  const pageActive=sessionStorage.getItem("pageActive");
  setAddActive(pageActive);
  },[addActive])


  return (
    <>
      <div className={toggle?"sidebar-wrapper hide":"sidebar-wrapper"}>
        <ul>
          {
            sidebarData.map((e,index)=>{
             
              return(
             
                <li key={index} id={e.id} onClick={()=>{handleMenu(e.id,e.path)}} className={(addActive==e.id)?"active":""}>
                <Link to={e.path}>
                  <span className="me-2">
                {e.icon}
                  </span>
                 {e.name}
                </Link>
              </li>
              )
            })
          }
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
