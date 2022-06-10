import React, {useState, useEffect } from "react";
import ChartData from "../Shared/ChartData";
import search from '../assets/images/search-icon.png';
import "./Common.css";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import axios from "axios";
import countArrow from "../assets/images/count-arrows.svg"

const Dashboard = () => {

const title="Dashboard";
const id=1;
  const navigate=useNavigate();
  useEffect(()=>{
    if(sessionStorage.getItem("auth")===null){
      navigate("/login")
    }    
  },[]);
  // table values
  const[savedData,setSavedData]=useState([{id:"",name:"",saved:""}]);
useEffect(()=>{
  const fetchData=async ()=>{
    await axios.get("http://localhost:8001/reports").then(res=>setSavedData(res.data));
  }
  fetchData();
},[])
const[searchname,setSearchName]=useState("");
const handleNameChange=(e)=>{
  setSearchName(e.target.value);
}
// pagination
const[currentPage,setCurrentPage]=useState(1);
const[itemsPerPage,setItemPerPage]=useState(5);
const pages=[];

for(let i=1;i<=Math.ceil(savedData.length/itemsPerPage);i++){
  pages.push(i);
}
const indexOfLastContact=currentPage*itemsPerPage;
const indexOfFirstContact=indexOfLastContact-itemsPerPage;
const currentItems=savedData.slice(indexOfFirstContact,indexOfLastContact);

const pageChangeClick=(pageNum)=>{
setCurrentPage(pageNum+1);
}

const handlePageSize=(e)=>{
  setItemPerPage(e.target.value)
  } 

const pageLimit=3;
const[maxPageNumberLimit,setMaxNumberLimit]=useState(3);
const[minPageNumberLimit,setMinNumberLimit]=useState(1);

const handlePrevBtn=(e)=>{
  e.preventDefault();
  setCurrentPage(currentPage-1);
  if((currentPage - 1) % pageLimit==0){
    setMaxNumberLimit(maxPageNumberLimit - pageLimit);
    setMinNumberLimit(minPageNumberLimit - pageLimit);
  }
}
const handleNextBtn=(e)=>{
  e.preventDefault();
  setCurrentPage(currentPage+1);
  if((currentPage + 1) > maxPageNumberLimit){
    setMaxNumberLimit(maxPageNumberLimit+pageLimit)
    setMinNumberLimit(minPageNumberLimit+pageLimit)
  }
}

let postIncrementBtn=null;
  if(pages.length>maxPageNumberLimit){
   postIncrementBtn= <li onClick={handleNextBtn}>...</li>
  }

  return (
    <>
    <DashboardLayout title={title} pageId={id}>
          <div className="overview">
              <h4>Overview</h4>
            </div>
            <div className="row main-row">
              <div className="col-md-6">
              <div className="chart-wrapper">
              <ChartData />
              </div>
              </div>
              <div className="col-md-6">
                <div className="contacts-table-wrapper">
                  <h5 >Number of Contacts Saved By User</h5>
                  <div className="search-field">
                    <label className="text-white">Search</label>
                   <div className="input-wrapper d-flex">
                   <input name="name" type="text" placeholder="Search By User Name..." onChange={handleNameChange} value={searchname} />
                   <div className="search-icon" ><img src={search} alt="search"/></div>
                   </div>
                  </div>
                  <div className="contacts-table table-responsive mt-2">
                    <table className="table text-white">
                    <thead>
                      <tr>
                        <td>#</td>
                        <td>Username</td>
                        <td>Saved Contacts</td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        currentItems.length>1?(  currentItems.filter((data)=>{
                          if(searchname==""){
                            return data
                          }
                          else if(data.name.toLowerCase().includes(searchname.toLowerCase())){
                            return data
                          }
                        }).map((e,index)=>(
                          <tr key={index}>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.saved}</td>
                          </tr>
                        )
                          
                        )
                    ):(<tr><td colSpan="3" style={{textAlign:"center"}}><span style={{color:"white",textAlign:"center"}}>No data found</span></td></tr>)
                      }
                     
                    </tbody>
                    </table>
                  </div>
                  <div className="pagination-sec d-flex justify-content-between align-items-center mt-2">
                <div className="page-size d-flex align-items-center">
                  <span>Show</span>
                <div className="custom-select">  
                <select onChange={handlePageSize} name="pageSize" value={itemsPerPage}>
                    <option name="five" value="5">5</option>
                    <option name="ten"   value="10">10</option>
                    <option name="twenty" value="20">20</option>
                  </select>
                  <img src={countArrow} alt="count-arrow"/>
                  </div>
                  <span>Last Entries</span>

                </div>
                <div className="page-numbers">
                <ul>
                <li><button  className="pagination-prev-btn" onClick={handlePrevBtn} disabled={currentPage==pages[0]?true:false}>Prev.</button></li>
             
                  {
                   pages.map((num,index)=>{
                   
                    if(num <= maxPageNumberLimit && num >= minPageNumberLimit){
                      return (
                      
                        <li key={index} id={num} onClick={()=>{pageChangeClick(index)}} className={currentPage==num?"active":""} >{num}</li>
                       )
                    }
                    
                   }) 
                  }
                    {postIncrementBtn}
                  <li><button className="pagination-next-btn" onClick={handleNextBtn} disabled={currentPage==pages[pages.length-1]?true:false}>Next</button></li>
                </ul>
                
               
              </div>
              </div>

                </div>
              </div>
            </div>
    </DashboardLayout>
          
         
    </>
  );
};

export default Dashboard;
