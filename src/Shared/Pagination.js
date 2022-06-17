import React,{useState} from 'react'
import countArrow from "../assets/images/count-arrows.svg"

const Pagination = ({contactDetails}) => {
    // pagination
const[currentPage,setCurrentPage]=useState(1);
const[itemsPerPage,setItemPerPage]=useState(5);
const pages=[];

for(let i=1;i<=Math.ceil(contactDetails.length/itemsPerPage);i++){
  pages.push(i);
}
const indexOfLastContact=currentPage*itemsPerPage;
const indexOfFirstContact=indexOfLastContact-itemsPerPage;
const currentItems={contactDetails}.slice(indexOfFirstContact,indexOfLastContact);

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
    
    </>
  )
}

export default Pagination