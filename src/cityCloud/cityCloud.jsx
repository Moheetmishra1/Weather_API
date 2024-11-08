import { memo, useEffect, useState } from "react";
import "./cityCloud.css"
import axios from "axios";

// eslint-disable-next-line react/prop-types
 function CityCloud({city,countryCode,temp,tempType,max,min,day,wType,lat,lon,id,update}){
  let [cityName,setCityName] = useState('')
  let days=['Mon','Tue','Wed','Thr','Fri','Sat','Sun']
  let [imagePath,setImagePath]= useState("https://cdn-icons-png.flaticon.com/128/151/151910.png")

  function mouseEnter(){
      if(imagePath=== "https://cdn-icons-png.flaticon.com/128/151/151910.png" )
      setImagePath('https://cdn-icons-png.flaticon.com/128/130/130193.png')
  }
  function mouseOut(){
    if(imagePath=== 'https://cdn-icons-png.flaticon.com/128/130/130193.png'  )
    setImagePath("https://cdn-icons-png.flaticon.com/128/151/151910.png")
  }

  async function clickM(){
    try{
    if(imagePath!== 'https://cdn-icons-png.flaticon.com/128/4340/4340223.png' ){
   setImagePath('https://cdn-icons-png.flaticon.com/128/4340/4340223.png');
   let find= await axios.get(`http://localhost:3000/cities`);
   console.log(find.data,find.data.some(a=>a.cityId === id));
   
      if(!find.data.some(a=>a.cityId === id)){
      let {data}= await  axios.post(`http://localhost:3000/cities`,{cityId:id, lat,lon,city,countryCode})
      console.log(data);
      }
    }else{
      setImagePath("https://cdn-icons-png.flaticon.com/128/151/151910.png");
      // let {data}= await  axios.delete(`http://localhost:3000/cities/${id}`)


    }
  }catch(err){
    console.log(err);
    
  }
  update()
    
  }

 

  console.log("city change");
  const fetchData = async ()=>{
    console.log("Inside the city name");
    
      let find= await axios.get(`http://localhost:3000/cities`);
    if(find.data.some(a=>a.cityId=== id)){
      console.log("fav");
      
      setImagePath('https://cdn-icons-png.flaticon.com/128/4340/4340223.png');
    }else{
      setImagePath('https://cdn-icons-png.flaticon.com/128/151/151910.png')
      console.log("not fav");

    }
  }
  if(city !== cityName){
    setCityName(city)
  }
  
  useEffect(()=>{
    console.log("chnage like");

    fetchData()
  },[cityName])


  // useEffect(()=>{
  //   setImagePath("https://cdn-icons-png.flaticon.com/128/151/151910.png");
  //   console.log(
  //     "find"
  //   );
    
  // },[id])
  

    return <div className="center-item">
    
    <main>
       
       {!city &&  <div className=" spin">
          <div className="loader">Loading...</div>
          <p className="ml10">
            <span className="text-wrapper">
              <span className="letters">Gathering info...</span>
            </span>
          </p>
        </div>}
        <div className="temp">
          <div className="label">
          <div className="fav"> <sup id="marker"><i className="fas fa-map-marker-alt"></i></sup><img src={imagePath} alt="" onClick={clickM} onMouseLeave={mouseOut}  onMouseEnter={mouseEnter} /></div> 
            <h1 id="name">{city}
            <sub id="country">{countryCode}</sub>
            </h1>
           
          </div>

          <h1 id="temp">{Math.floor(temp)}

          <sup>◦{tempType}</sup>
          </h1>

          
          <div className="min-max">
            <span id="max">{Math.floor(max)}    <sup>◦{tempType}</sup></span>
            <span id="slash">/</span>
            <span id="min">{Math.floor(min)}   <sup>◦{tempType}</sup></span>
            <span style={{padding: '0px 10px'}}></span>
            <span id="day">{days[new Date().getDay()-1]}</span>
          </div>




          <span id="description" ><i className="fas fa-cloud"></i> <span id="desc">{wType}</span   ></span>
        </div>
      </main>
    
    </div>
}


export default memo(CityCloud)