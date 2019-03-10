const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})

app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: 'Welcome Page',
    welcomeMsg: 'We welcome you to us.',
  })
})

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page',
  })
})

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage: 'error'
  })
})

app.listen(3000,()=>{
  console.log('Server is running on port number 3000.')
});
