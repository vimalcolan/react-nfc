import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import {Doughnut} from 'react-chartjs-2'
import {Chart,ArcElement,Tooltip,Legend} from 'chart.js'
import axios from 'axios'
Chart.register(
  ArcElement,Tooltip,Legend
)

const ChartData = () => {
    const[chartValues,setChartValues]=useState({datasets: [],labels:[]});
     useEffect(()=>{
         const chartResponse=async()=>{
             await axios.get("http://localhost:8001/reports")
             .then(resp=>resp.data).then(response=>{
                const data=[];
                const label=[];

                // get unique
                // const label = response.from(new Set(location));
                // const uniqueNames=[];
                // const labelArray=response.filter((e,index)=>{
                // return  (e.location)
                // });
                // label.push(labelArray);



                for (var i of response){
                
                 label.push(i.location)
               
                    
                    // console.log("label",label);
                    data.push(i.taps);
                    // console.log("data",data);
                }
                // console.log(resp.data);
                setChartValues({
                  datasets: [{
                            data:data,
                            backgroundColor:[ "#CA9C31",'#854095','#E37E06','#1170CB','#D9B648']
                        }], 
                  labels:label,
                
                })
             }).catch(error=>console.log("error",error))

            }  
        chartResponse();  
    },[])
  //   const data={
  // }
  
  return (
    <>
 <Doughnut data={chartValues} height={400} width={600}/>
    </>
  )
}

export default ChartData



