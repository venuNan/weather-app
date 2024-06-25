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
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=us&include=days&key=RC5YBMR5N93FWUMF338LY4YBV&contentType=json`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        
        const fullAddress = data.resolvedAddress;
        const pressure = data.days[0].pressure;
        const windSpeed = data.days[0].windspeed;
        const visibility = data.days[0].visibility;
        const maxTemp = data.days[0].tempmax;
        const minTemp = data.days[0].tempmin;
        const temp = data.days[0].temp;
        const todayCondition = data.days[0].conditions;
        

        console.log("Full Address:", fullAddress);
        console.log("Pressure:", pressure);
        console.log("Wind Speed:", windSpeed);
        console.log("Visibility:", visibility);
        console.log("Max Temp:", maxTemp);
        console.log("Min Temp:", minTemp);
        console.log("temp :", temp);
        console.log("today condition:", todayCondition);

        document.querySelector(".location #address").textContent = fullAddress;
        document.getElementById("celcius").innerHTML = `${((temp-32)*5/9).toFixed(0)} <sup>o</sup>C`;
        
        document.querySelector(".information .today-weather .today-temperature #condition").textContent = todayCondition;
    } catch (error) {
        errorMessageElement.style.display = "block";
        console.error('Error fetching weather data:', error);
    }
}
