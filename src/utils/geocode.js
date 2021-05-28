const request = require('request');

const geocode = (address, callback) => {
  const geocodeuri =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoiZXJ5c2ltdW0iLCJhIjoiY2twNmRtZ2lmMGVveTJ1bzRxdm1jZDJ1cSJ9.Nd6nVcCFvg8o8pcOnjBxDQ';

  request({ uri: geocodeuri, json: true }, (err, res) => {
    if (err) {
      //low level error such as wifi network
      callback('Network Error ', undefined);
    } else if (res.body.features.length === 0) {
      callback('Check your URL', undefined);
    } else {
      callback(undefined, {
        longitude: res.body.features[0].center[0],
        latitude: res.body.features[0].center[1],
        location: res.body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
