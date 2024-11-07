

export function CityCloud({}){


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
            <h1 id="name"></h1>
            <sub id="country"></sub>
          </div>

          <h1 id="temp"></h1>
          <div class="min-max">
            <span id="max"></span>
            <span id="slash">/</span>
            <span id="min"></span>
            <span style="padding: 0 10px"></span>
            <span id="day"></span>
          </div>
          <span id="description"
                ><i class="fas fa-cloud"></i> <span id="desc"></span   ></span>
        </div>
      </main>
    
    </>
}