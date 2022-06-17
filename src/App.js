import React, { useEffect, useState } from "react";
import './App.css';
import RoutesFile from './Routes/RoutesFile';
import "./Common/Common.css";




function App() {
  // const[loader,setLoader]=useState(true);
 
  // useEffect(()=>{
  //   setTimeout(
  //     ()=>{
  //       setLoader(false)
  //     },20000
  //   )
  // },[])

  

  return(
    <>
     <RoutesFile/>
    </>
   
  )

  
}

export default App;
