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
    // const[chartData,setChartData]=useState([]);

     useEffect(()=>{
         const chartResponse=async()=>{
             await axios.get("http://localhost:8001/reports")
             .then(resp=>resp.data).then(response=>{
              // setChartData(response)
                
              // var uniqueNamesArray=[];
                //   uniqueNamesArray = label.filter((e,index)=> {
                //   return label.indexOf(e) == index;
                // });
                const arr=[...response];
                const res = [...arr.reduce((acc, curr) => {

                    const { location } = curr;
                    const grouped = acc.get(location);
                    if(!grouped) {
                      acc.set(location, { ...curr });
                    } 
                    else {
                      acc.set(location, { ...grouped, saved: Number(grouped.saved) + Number(curr.saved) })
                    }

                    return acc

                  }, new Map)
                  .values()
                ];
               
                const data=[];
                const label=[];
                for (var i of res){
                  label.push(i.location);
                  data.push(i.saved)
                }

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
    // console.log("chart",chartData);
    // const uniqueItems=[...new Map(chartData.map(e=>[e["location"],e])).values()];
    // console.log("unique savess",uniqueItems);

    // chartData.map((e)=>{
    //   uniqueItems.map((j)=>{
    //     if(j.location==e.location){
    //       e.saved=Number(e.saved)+Number(j.saved)
    //     }
    //   })
    // });
    // console.log("updated",chartData)

//     var uniqueItems=[]
//     uniqueItems=[...new Map(chartData.map((e)=> [e["location"],e])).values()];
//      console.log("unique savess",uniqueItems);
//      setChartData(...chartData,uniqueItems);
//        for(var i=0;i<uniqueItems.length;i++){
//    for (var j=0;j<chartData.length;j++){
//    if(uniqueItems[i].location==chartData[j].location){
//      uniqueItems[i].saved=Number(chartData[j].saved)+Number(uniqueItems[i].saved)
//    }
//    else{
//      console.log("no results");
//    }
//    }
//  }
//  console.log("con",uniqueItems);

   

    
// const arr = [ { id:1,location: 'Russia', saved: 50 }, { id:2,location: 'Russia', saved: 50 }, { id:3,location: 'Russia', saved: 100 }, { id:4,location: 'africa', saved: 75 }, {id:5, location: 'africa', saved: 35 },{id:6, location: 'africa', saved: 25 }, { id:7,location: 'india', saved: 25 } ];





  return (
    <>
 <Doughnut data={chartValues} height={400} width={600}/>
    </>
  )
}

export default ChartData