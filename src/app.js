const express = require('express');
const hbs = require('hbs');
const path = require('path')
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const port = process.env.PORT || 3000;
var app = express();

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sudiksha Srivastava'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sudiksha Srivastava'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Sudiksha Srivastava'
    })
})

app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      error:  'Must provide address'
    })
  }
  geocode.geocodeAddress(req.query.address,(errorMessage,results)=>{


    weather.getWeather(results.latitutde,results.longitude,(errorMessage,weatherResults) => {

         res.send({result: `It's currently ${weatherResults.temperature} and it feels like ${weatherResults.apparentTemperature}`});

    });

});
})

app.get('/projects',(req,res)=>{
  res.render('project.hbs',{
    pageTitle: 'Projects',
    welcomeMsg: 'Maintain your portfolio here.'
  })
})
app.get("/help/utils",(req,res)=>{
  res.send('Page article not found')
})
app.get('*',(req,res)=>{
  res.send('404 not found')
})


app.listen(port,()=>{
  console.log(`Server is running on port number ${port}.`)
});
