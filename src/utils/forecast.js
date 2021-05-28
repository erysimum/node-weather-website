const request = require('request');

const forecast = (longi, lati, callback) => {
  const uri = `http://api.weatherstack.com/current?access_key=6d1ec68eba8aa70bc67d6b0de79e7bf7&query=${lati},${longi}`;

  request({ uri, json: true }, (err, res) => {
    if (err) {
      callback(' NETWORK ERROR', undefined);
    } else if (res.body.error) {
      callback('CHECK URL', undefined);
    } else {
      callback(undefined, {
        temperature: res.body.current.temperature,
        feelslike: res.body.current.feelslike,
        wind_speed: res.body.current.wind_speed,
        wind_degree: res.body.current.wind_degree,
        humidity: res.body.current.humidity,
        visibility: res.body.current.visibility
      });
    }
  });
};

module.exports = forecast;
