const { response } = require("express");
const express = require("express");
const https = require('https');

const app = express();


app.get("/", (req, res) => {

  const url = "https://api.openweathermap.org/data/2.5/weather?q=volksrust&appid=90fddc2e8114ead9e1d7975075dfefab&units=metric"
  https.get(url, function(response){
    console.log(response.statusCode)

    response.on("data", data => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      res.write(`<h1>The temperature in Volksrust is ${temp} degress Celcius.</h1>`)
      res.write(`<p>${description}</p>`);
      res.write(`<img src=http://openweathermap.org/img/wn/${icon}@2x.png>`)
      res.send()
    })
  })
})


//90fddc2e8114ead9e1d7975075dfefab

app.listen(3000, () => console.log("Server is running on port 3000"))