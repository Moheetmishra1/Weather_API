import "./cityCloud.css"

// eslint-disable-next-line react/prop-types
export function CityCloud({city,countryCode,temp,tempType,max,min,day,wType}){


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
            <sup id="marker"><i className="fas fa-map-marker-alt"></i></sup>
            <h1 id="name">{city}
            <sub id="country">{countryCode}</sub>
            </h1>
           
          </div>

          <h1 id="temp">{Math.floor(temp)}

          <sup>◦{tempType}</sup>
          </h1>

          
          <div className="min-max">
            <span id="max">{Math.floor(max)}</span>
            <span id="slash">/</span>
            <span id="min">{Math.floor(min)}</span>
            <span style={{padding: '0px 10px'}}></span>
            <span id="day">{day}</span>
          </div>




          <span id="description" ><i className="fas fa-cloud">{wType}</i> <span id="desc"></span   ></span>
        </div>
      </main>
    
    </div>
}