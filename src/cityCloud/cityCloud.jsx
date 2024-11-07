

export function CityCloud({city,countryCode,temp,tempType,max,min,day,wType}){


    return <>
    
    <main>
       
        <div class=" spin">
          <div class="loader">Loading...</div>
          <p class="ml10">
            <span class="text-wrapper">
              <span class="letters">Gathering info...</span>
            </span>
          </p>
        </div>
        <div class="temp">
          <div class="label">
            <sup id="marker"><i class="fas fa-map-marker-alt"></i></sup>
            <h1 id="name">{city}</h1>
            <sub id="country">{countryCode}</sub>
          </div>

          <h1 id="temp">{temp}</h1>
          <sub>{tempType}</sub>
          <div class="min-max">
            <span id="max">{max}</span>
            <span id="slash">/</span>
            <span id="min">{min}</span>
            <span style="padding: 0 10px"></span>
            <span id="day">{day}</span>
          </div>
          <span id="description"
                ><i class="fas fa-cloud">{wType}</i> <span id="desc"></span   ></span>
        </div>
      </main>
    
    </>
}