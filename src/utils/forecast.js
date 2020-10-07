const request = require("request");

const forecast = (latitude, longtitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=6caae61751610c4e6297eb66f8712ef7&query=" +
    latitude +
    "," +
    longtitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.error) {
      callback("Unable to find current weather. Try another search");
    } else {
      callback(
        undefined,
        body.location.region +
          ", " +
          body.location.country +
          ".\n The weather is " +
          body.current.weather_descriptions[0] +
          " and it was oservated at " +
          body.current.observation_time +
          ". It is currently " +
          body.current.temperature +
          " degrees out. It feels like " +
          body.current.feelslike +
          " degrees out.\n Wind speed is " +
          body.current.wind_speed +
          "; wind degree is " +
          body.current.wind_degree +
          " and humidity is " +
          body.current.humidity +
          " %."
      );
    }
  });
};

module.exports = forecast;
