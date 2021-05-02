
window.addEventListener('DOMContentLoaded', async function() {
    // Get a reference to the "get weather" button
    let getWeatherButton = document.querySelector(`.get-weather`)
    // When the "get weather" button is clicked:
    getWeatherButton.addEventListener(`click`, async function(event){
      // - Ignore the default behavior of the button
      event.preventDefault()
        // - Get a reference to the element containing the user-entered location
        let locationInput = document.querySelector(`#location`)
        // - Get the user-entered location from the element's value
        let location = locationInput.value

        //get a reference to the element containing the user-entered number of days
        let daysInput = document.querySelector(`#days`)

        // Get the user entered number of days from the element's value
        let days = daysInput.value
  
        // - Check to see if the user entered a location and days; if so:
        if (location.length > 0 && days > 0)
        {
          // - Construct a URL to call the WeatherAPI.com API sending the user entered location and number of days
          let url = `https://api.weatherapi.com/v1/forecast.json?key=e7cd2d3f07554fd0bbe04729213004&q=${location}&days=${days}`
  
          // - Fetch the url, wait for a response, store the response in memory
          let response = await fetch(url)
  
          // - Ask for the json-formatted data from the response, wait for the data, store it in memory
          let json = await response.json()
  
          // - Write the json-formatted data to the JavaScript console
          console.log(json)
          // - Store the interpreted location, current weather conditions, the forecast as three separate variables
          let locationOutput = json.location
          let currentOutput = json.current
          let forecastOutput = json.forecast
          // - Continue the recipe yourself!
  
          //get a reference to the element containing current weather
          let currentElement = document.querySelector(`.current`)
  
          //replace the current element's content with the current weather for the location given by the user
          currentElement.innerHTML =  `
            <div class="text-center space-y-2">
            <div class="font-bold text-3xl">Current Weather for ${locationOutput.name}, ${locationOutput.region}</div>
            <div class="font-bold">
                <img src="https:${currentOutput.condition.icon}" class="inline-block">
                <span class="temperature">${currentOutput.temp_f}</span>° 
                and
                <span class="conditions">${currentOutput.condition.text}</span>
            </div>
            </div>`

            //Get a reference to the element containing the forecast
            let forecastElement = document.querySelector(`.forecast`)

            //Replace the forecast element's content with the number of days returned by the api
            forecastElement.innerHTML = `
              <div class="text-center space-y-8">
                <div class="font-bold text-3xl">${forecastOutput.forecastday.length} Day Forecast</div>
              </div>`

            //Create a for loop to loop through the forecast array
            for (let i = 0; i < forecastOutput.forecastday.length; i++){
              
              //insert HTML at the end of the forecast class to add forecast details at element i in the array
              forecastElement.insertAdjacentHTML(`beforeend`,`
                <div class="text-center space-y-8">
                  <div>
                    <img src="https://${forecastOutput.forecastday[i].day.condition.icon}" class="mx-auto">
                    <h1 class="text-2xl text-bold text-gray-500">${forecastOutput.forecastday[i].date}</h1>
                    <h2 class="text-xl">High ${forecastOutput.forecastday[i].day.maxtemp_f}° – Low ${forecastOutput.forecastday[i].day.mintemp_f}°</h2>
                    <p class="text-gray-500">${forecastOutput.forecastday[i].day.condition.text}</h1>
                  </div>
                </div>
              `)
            }



        
  
        }
          
  
    })
  
      
  })