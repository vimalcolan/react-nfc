import React, { useEffect, useState } from "react";
import countArrow from "../assets/images/count-arrows.svg"
import axios from "axios";

import "../Components/pages.css";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../Common/DashboardLayout";
import exportFromJSON from 'export-from-json' 


const Reports = () => {
  const title="Reports";
  const id=3;

  const [reports,setReportsTable]=useState([]);
  // const[customReport,setcustomReport]=useState([{
  //   id:"",
  //   name:"",
  //   saved:"",
  //   taps:""
  // }])
  const navigate=useNavigate();

useEffect(()=>{
  // Authentication
  if (sessionStorage.getItem("auth")) {
    navigate("/reports");
  } else {
    navigate("/login");
  }

},[])

useEffect(()=>{

//  Fetching Api Values
  const fetchData= async ()=>{
    // debugger;
    await axios.get("http://localhost:8001/reports").then(res=>setReportsTable(res.data))
  }
  fetchData();
 
},[])

// taps
  // var tapsVal=[];
  // for(var i of reports){
  // tapsVal.push((i.reportDetails).length);
  // }
  


// saves
//   var getReportDetails=[];
//   for (var i of reports){
//     getReportDetails.push(i.reportDetails);
//   }
// var getSavedVal=[];
//   for(var res of getReportDetails){
//     // console.log("saved object",res);  
//     getSavedVal.push(res)
//   }
//   console.log("");
// for(var resp of getSavedVal){
//   console.log("saved values",resp)
// }








// filter
const[filterName,setFilterName]=useState("");
const[filterLocation,setFilterLocation]=useState("");
const handleFilterName=(e)=>{
  setFilterName(e.target.value);
}
const handleFilterLocation=(e)=>{
  setFilterLocation(e.target.value);
  console.log(filterLocation);
}

// pagination
const[currentPage,setCurrentPage]=useState(1);
const[itemsPerPage,setItemPerPage]=useState(5);
const pages=[];

for(let i=1;i<=Math.ceil(reports.length/itemsPerPage);i++){
  pages.push(i);
}
const indexOfLastContact=currentPage*itemsPerPage;
const indexOfFirstContact=indexOfLastContact-itemsPerPage;
const currentItems=reports.slice(indexOfFirstContact,indexOfLastContact);

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

// sample document download
const data=reports;  
  const fileName = 'download'  
  const exportType = 'xls' 
  
  const ExportToExcel = () => {  
    exportFromJSON({ data, fileName, exportType })  
  }  

  return (
    <>
    
        <DashboardLayout title={title} pageId={id}>
        <div className="reports-page">
            <div className="overview d-flex justify-content-between">
              <h4>List of Reports</h4>
              <div className="custom-select" >
                Export as
                <select onClick={ExportToExcel}>
                  <option></option>
                  <option >xls</option>
                </select>
              </div>
            </div>
            <div className="filter-row d-flex align-items-center">
              <h5>Filter</h5>
              <input className="mx-2" type="text" placeholder="Search by User Name..." onChange={handleFilterName} value={filterName}/>
              <input type="text"placeholder="Search by Geolocation" onChange={handleFilterLocation} value={filterLocation}/>
            </div>
            <div className="table-row table-responsive">
              <table className="table">
                <thead>
                 <tr>
                 <th>#</th>
                  <th>Name</th>
                  <th>Number of Saves</th>
                  <th>Number of Overall Taps</th>
                  <th>Geolocation</th>
                 </tr>
                </thead>
                <tbody>
                  {reports.length?
                  (
                    currentItems.filter((value)=>{
                     if(handleFilterName==""&&handleFilterLocation=="")
                     {
                       return value
                    }
                     else if(
                      value.name.toLowerCase().includes(filterName.toLowerCase())&&
                      value.location.toLowerCase().includes(filterLocation.toLowerCase()))
                      {
                        return value
                      }
                   }).
                   map((data,index)=>(
                      <tr key={index}>
                      <td>{data.id}</td>
                      <td>{data.name}</td>
                      <td>{data.saved}</td>
                      <td>{data.taps}</td>
                      <td>{data.location}</td>
                    </tr>
                     ))):(
                     <tr>
                      <td colSpan="6">
                      <div className="loading-gif">
                       <span className="loader">
                         <span className="loader-inner"></span>
                       </span>
                     </div>
                      </td>
                     </tr>
                     )
                     }
                
                  
                 
                </tbody>
              </table>
            </div>
        
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
        </DashboardLayout>
       
    </>
  )
}

export default Reports