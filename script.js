document.getElementById("inplace").addEventListener("input",function(){
    document.getElementById("error-message").style.display = "none";
});

async function weather() {
    const place = document.getElementById("inplace").value.trim(); 
    if (place === "") {
        document.getElementById("error-message").style.display = "block";
        return;
    }

    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.style.display = "none";

    try {

        //
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=us&include=days&key=RC5YBMR5N93FWUMF338LY4YBV&contentType=json`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        

        // the below line is to display the full address of the user
        const fullAddress = data.resolvedAddress;
        document.querySelector(".location #address").textContent = fullAddress;

        // the follwing if else statements is to display the weather icon for today
        const icon = data.days[0].icon.toLowerCase();
        const desc = data.days[0].description.toLowerCase();
        console.log(icon);
        const weathericon = document.querySelector(".information .today-weather .today-temperature #icon");
        if(icon.includes("clear")){
            weathericon.style.backgroundImage = "url(sun.png)";
        }
        else if(icon.includes("rain") && desc.includes("cloudy") && desc.includes("storm")){
            weathericon.style.backgroundImage = "url(cloud-rain-storm.png)";
        }
        else if(icon.includes("cloudy") && desc.includes("storm")){
            weathericon.style.backgroundImage = "url(cloud.storm.png)";
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
        document.getElementById("celcius").innerHTML = `${((temp-32)*5/9).toFixed(0)} <sup>o</sup>C`;
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

        const formattedDates = [];
        for (let i = 0; i < 10; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const formattedDate = date.toLocaleDateString('en-US', options);
            formattedDates.push(formattedDate);
        }

        document.querySelector(".information .tenday-weather #day1 #date").textContent = formattedDates[0];
        document.querySelector(".information .tenday-weather #day2 #date").textContent = formattedDates[1];
        document.querySelector(".information .tenday-weather #day3 #date").textContent = formattedDates[2];
        document.querySelector(".information .tenday-weather #day4 #date").textContent = formattedDates[3];
        document.querySelector(".information .tenday-weather #day5 #date").textContent = formattedDates[4];
        document.querySelector(".information .tenday-weather #day6 #date").textContent = formattedDates[5];
        document.querySelector(".information .tenday-weather #day7 #date").textContent = formattedDates[6];
        document.querySelector(".information .tenday-weather #day8 #date").textContent = formattedDates[7];
        document.querySelector(".information .tenday-weather #day9 #date").textContent = formattedDates[8];
        document.querySelector(".information .tenday-weather #day10 #date").textContent = formattedDates[9];



    } catch (error) {
        errorMessageElement.style.display = "block";
        console.error('Error fetching weather data:', error);
    }
}
