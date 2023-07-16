const express = require("express");
const app = express();
const port = 3000;
const https = require("https");
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname + "/style.css"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const value = req.body.city;
  const appId = "";
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${appId}&units=${units}`;
  https.get(url, (resp) => {
    resp.on("data", (datas) => {
      const weatherInfo = JSON.parse(datas);
      const icon = weatherInfo.weather[0].icon;
      const imgUrl = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" height=50 width=50>`;
      const city = weatherInfo.name;
      const country = weatherInfo.sys.country;
      const temp = weatherInfo.main.temp;
      res.send(
        `<span>the Temperature in</span> (${country}) ${city} is ${
          temp + imgUrl
        }`
      );
    });
  });
});

app.listen(port, () => {
  console.log(`the server is live in port ${port}`);
});
