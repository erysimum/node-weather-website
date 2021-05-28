const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//configure Path in Express
const accessPublicFolder = path.join(__dirname, '../public');
const accessViewsFolder = path.join(__dirname, '../templates/views');
const accessPartialFolder = path.join(__dirname, '../templates/partials');

//if you wanna rename vies to templates
// const viewTemplate = path.join(__dirname, '../templates');
// app.set('views', viewTemplate);

//Setup Handllebars
app.set('view engine', 'hbs');
app.set('views', accessViewsFolder);
hbs.registerPartials(accessPartialFolder);

//Setup static directory
app.use(express.static(accessPublicFolder));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Amit Shahi'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About ',
    name: 'Amit Shahi'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'THis is a help page!!',
    title: 'Help ',
    name: 'Amit Shahi'
  });
});

app.get('/help/*', (req, res) => {
  res.render('404error', {
    errorMessage: 'Help Test',
    title: 'Help ErrorEvent',
    name: 'error name'
  });
});

//http://localhost:4567/weather?address=Melbourne
app.get('/weather', (req, res) => {
  console.log(req.query); //pickedup after /weather
  if (!req.query.address) {
    return res.send({
      error: 'Address is missing'
    });
  }
  const address = req.query.address;
  geocode(address, (error, data) => {
    if (error) {
      return res.send({
        error: 'Something went wrong!!'
      });
    }
    forecast(data.longitude, data.latitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: 'Something went wrong'
        });
      }
      res.send({
        temperature: forecastData.temperature,
        feelslike: forecastData.feelslike,
        wind_speed: forecastData.wind_speed,
        wind_degree: forecastData.wind_degree,
        humidity: forecastData.humidity,
        visibility: forecastData.visibility
      });
    });
  });
});

app.get('*', (req, res) => {
  res.render('404error', {
    errorMessage: 'Page not found',
    title: ' 404 Error',
    name: 'Amit Shahi'
  });
});

app.get('/about', (req, res) => {
  res.send('<h2><strong> About Us<strong><h2>');
});

app.listen(4567, () => {
  console.log('server is up and runing on port 4567');
});
