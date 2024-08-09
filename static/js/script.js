document.getElementById("inplace").addEventListener("input",function(){
    document.getElementById("error-message").style.display = "none";
});

function default_function(){
    const place = "manubolupadu";
    weather(place);

}

window.onload = default_function;
function user_function(){
    const place = document.getElementById("inplace").value.trim();
    weather(place);
}
async function weather(place) { 
    if (place === "") {
        document.getElementById("error-message").style.display = "block";
        return;
    }

    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.style.display = "none";

    try {

        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=metric&include=days%2Chours&key=RC5YBMR5N93FWUMF338LY4YBV&contentType=json`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        

        // the below line is to display the full address of the user
        const fullAddress = data.resolvedAddress;
        document.querySelector(".location #address").textContent = fullAddress;

        // the follwing if else statements is to display the weather icon for today
        const icon = data.days[0].icon.toLowerCase();
        const desc = data.days[0].description.toLowerCase();
        const weathericon = document.querySelector(".information .today-weather .today-temperature #icon");
        if(icon.includes("clear")){
            weathericon.style.backgroundImage = "url(sun.png)";
        }
        else if(icon.includes("rain") && desc.includes("cloudy") && desc.includes("storm")){
            weathericon.style.backgroundImage = "url(cloud-rain-storm.png)";
        }
        else if((icon.includes("cloudy") || desc.includes("cloudy")) && desc.includes("storm")){
            weathericon.style.backgroundImage = "url(cloud-storm.png)";
        }
        else if(icon.includes("partly") && icon.includes("cloudy")){
            weathericon.style.backgroundImage = "url(partly-cloudy.png)";
        }
        else if(icon.includes("cloudy")){
            weathericon.style.backgroundImage = "url(cloudy.png)";
        }
        else if(icon.includes("rain")){
            weathericon.style.backgroundImage = "url(cloud-rain.png)";
        }
        

        // the below two lines is to play the description of the weather and todays temperature
        const description = data.days[0].description;
        const temp = data.days[0].temp;
        document.getElementById("celcius").innerHTML = `${(temp).toFixed(0)} <sup>o</sup>C`;
        document.querySelector(".information .today-weather .today-temperature #desc").textContent = description;

        // the next two lines is to display today's date
        const today = new Date();
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        const formattedDate = today.toLocaleDateString('en-US', options);
        document.querySelector(".information .today-weather .today-details #date #value").textContent = formattedDate;

        // the below lines until else condition is to display todays details of date,humidity,windspeed,winddirection,visiblity,pressure
        const pressure = data.days[0].pressure;
        document.querySelector(".information .today-weather .today-details #pressure #value").textContent = pressure +" mb";
        const windSpeed = data.days[0].windspeed;
        document.querySelector(".information .today-weather .today-details #windspeed #value").textContent = windSpeed+" km/h";
        const visibility = data.days[0].visibility;
        document.querySelector(".information .today-weather .today-details #visibility #value").textContent = visibility +" km";
        const humidity = data.days[0].humidity;
        document.querySelector(".information .today-weather .today-details #humidity #value").textContent = humidity.toFixed(1)+" %";
        const windDir = data.days[0].winddir;
        if (windDir >= 67.5 && windDir <= 112.5) {
            document.querySelector(".information .today-weather .today-details #wind-direction #value").textContent = "East";
        } else if (windDir >= 157.5 && windDir <= 202.5) {
            document.querySelector(".information .today-weather .today-details #wind-direction #value").textContent = "South";
        } else if (windDir >= 247.5 && windDir <= 292.5) {
            document.querySelector(".information .today-weather .today-details #wind-direction #value").textContent = "West";
        } else {
            document.querySelector(".information .today-weather .today-details #wind-direction #value").textContent = "North";
        }
        // the following for loop and fromattedDates variable is to dispaly the dates of tenday forecast
        const formattedDates = [];
        for (let i = 0; i < 10; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const formattedDate = date.toLocaleDateString('en-US', options);
            formattedDates.push(formattedDate);
        }
        
        // the following for loop and ten_weather_variable is to diaply th e dates and weather icons of tenday forecast
        const ten_day_weather = document.querySelector(".tenday-weather1 .tenday-weather");
        ten_day_weather.innerHTML = "";
        for (let i=0;i<10;i++){
            // 
            const day = document.createElement("div");
            day.className = "day";
            day.id = `day${i+1}`;
            const date = document.createElement("div");
            date.id = "date";
            date.innerText = formattedDates[i];
            day.append(date);
            const temp_symbol = document.createElement("div");
            temp_symbol.className = "temp-symbol";
            const temp = document.createElement("div");
            temp.id = "temp";
            temp.innerHTML = `${(((data.days[i].tempmin)).toFixed(0))}<sup>o</sup>C  &nbsp/&nbsp  ${(((data.days[i].tempmax)).toFixed(0))}<sup>o</sup>C`;
            temp_symbol.append(temp);
            const symbol = document.createElement("div");
            symbol.id = "symbol";
            const icon1 = data.days[i].icon.toLowerCase();
            const desc1 = data.days[i].description.toLowerCase();
            if(icon1.includes("clear")){
                symbol.style.backgroundImage = "url(sun.png)";
            }
            else if(icon1.includes("rain") && desc1.includes("cloudy") && desc1.includes("storm")){
                symbol.style.backgroundImage = "url(cloud-rain-storm.png)";
            }
            else if(icon1.includes("cloudy") && desc1.includes("storm")){
                symbol.style.backgroundImage = "url(cloud-storm.png)";
            }
            else if(icon1.includes("partly") && icon1.includes("cloudy")){
                symbol.style.backgroundImage = "url(partly-cloudy.png)";
            }
            else if(icon1.includes("cloudy") && desc1.includes("rain")){
                symbol.style.backgroundImage = "url(cloudy-rains.png)";
            }
            else if(icon1.includes("cloudy")){
                symbol.style.backgroundImage = "url(cloudy.png)";
            }
            else if(icon1.includes("rain")){
                symbol.style.backgroundImage = "url(cloud-rain.png)";
            }
            temp_symbol.append(symbol);
            day.append(temp_symbol);
            ten_day_weather.append(day);        
        }
        
        // the following for loop  is to display today's hourly weather
        const todayweather = data.days[0].hours;        
        for(let i=0;i<24;i++){
            const icon2 = data.days[0].hours[i].icon.toLowerCase();
            const desc2 = data.days[0].hours[i].conditions.toLowerCase();
            const datetime = data.days[0].hours[i].datetime.split(":")[0];
            if(icon2.includes("clear") && ((datetime>=0 && datetime<=5) || (datetime>=17 && datetime<=23))){
                document.querySelector(`.hourly-weather1 .hourly-weather .container #hour${i+1} #image`).style.backgroundImage = "url(night.png)";
            }
            else if(icon2.includes("clear")){
                document.querySelector(`.hourly-weather1 .hourly-weather .container #hour${i+1} #image`).style.backgroundImage = "url(sun.png)";
            }
            else if(icon2.includes("rain") && desc2.includes("cloudy") && desc2.includes("storm")){
                document.querySelector(`.hourly-weather1 .hourly-weather .container #hour${i+1} #image`).style.backgroundImage = "url(cloud-rain-storm.png)";
            }
            else if(icon2.includes("cloudy") && desc2.includes("storm")){
                document.querySelector(`.hourly-weather1 .hourly-weather .container #hour${i+1} #image`).style.backgroundImage = "url(cloud-storm.png)";
            }
            else if(icon2.includes("partly") && icon2.includes("cloudy") && ((datetime>=0 && datetime<=5) || (datetime>=17 && datetime<=23))){
                document.querySelector(`.hourly-weather1 .hourly-weather .container #hour${i+1} #image`).style.backgroundImage = "url(cloud-night.png)";
            }
            else if(icon2.includes("partly") && icon2.includes("cloudy")){
                document.querySelector(`.hourly-weather1 .hourly-weather .container #hour${i+1} #image`).style.backgroundImage = "url(partly-cloudy.png)";
            }
            else if(icon2.includes("cloudy") && desc2.includes("rain") && ((datetime>=0 && datetime<=5) && (datetime>=19 && datetime<=23))){//
                document.querySelector(`.hourly-weather1 .hourly-weather .container #hour${i+1} #image`).style.backgroundImage = "url(cloudy-rainy-night.png)";
            }
            else if(icon2.includes("cloudy") && desc2.includes("rain")){
                document.querySelector(`.hourly-weather1 .hourly-weather .container #hour${i+1} #image`).style.backgroundImage = "url(cloudy-rains.png)";
            }
            else if(icon2.includes("cloudy")){
                document.querySelector(`.hourly-weather1 .hourly-weather .container #hour${i+1} #image`).style.backgroundImage = "url(cloudy.png)";
            }
            else if(icon2.includes("rain")){
                document.querySelector(`.hourly-weather1 .hourly-weather .container #hour${i+1} #image`).style.backgroundImage = "url(cloud-rain.png)";
            }
        }

    } catch (error) {
        errorMessageElement.style.display = "block";
        console.error('Error fetching weather data:', error);
    }
}
