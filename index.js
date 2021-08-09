const { default: axios } = require("axios");
const express = require("express");
const moment = require("moment");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/apabole", (req, res) => {
  let string = "";
  let index = 1;
  let length = 100;
  for (index; index <= length; index++) {
    if (index % 3 === 0 && index % 5 === 0) {
      if (index == length) {
        string += "ApaBole";
      } else {
        string += "ApaBole" + ", ";
      }
    } else if (index % 5 === 0) {
      if (index == length) {
        string += "Bole";
      } else {
        string += "Bole" + ", ";
      }
    } else if (index % 3 === 0) {
      if (index == length) {
        string += "Apa";
      } else {
        string += "Apa" + ", ";
      }
    } else {
      if (index == length) {
        string += index;
      } else {
        string += index + ", ";
      }
    }
  }
  console.log(string);

  return res.status(200).send({
    code: 200,
    status: "Succes",
    message: "Success",
  });
});

app.get("/ramalan", (req, res) => {
  let url = "https://api.openweathermap.org/data/2.5/onecall";
  let lat = -6.2;
  let lon = 106.816666;
  let exc = "current,minutely,hourly,alerts";
  let apiKey = "d788a0c578ce4b8cfb794daababc60a4";
  let units = "metric";

  axios
    .get(url, {
      params: { lat: lat, lon: lon, exclude: exc, appid: apiKey, units: units },
    })
    .then((resp) => {
      let s = "";

      for (let i = 0; i < resp.data.daily.length; i++) {
        let date = new Date(resp.data.daily[i].dt * 1000);
        let temp = resp.data.daily[i].temp.max;
        let disDate = moment(date).format("ddd, Do MMM YYYY: ");
        s += disDate += temp + "\u00B0C \n";
      }

      console.log("Weather Forecast: \n" + s);

      return res.status(200).send({
        code: 200,
        status: "Succes",
        message: "Success",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
