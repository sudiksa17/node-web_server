const request = require('request');

var getWeather=(lat,lng,callback)=>{
  request({
    url:`https://api.darksky.net/forecast/133978b6c6c3fe630eca3f3b78744ee4/${lat},${lng}`,
    json: true
  },(error,response,body) => {
    if(!error&&response.statusCode===200){
      callback(undefined,{
        temperature:body.currently.temperature,
        apparentTemperature:body.currently.apparentTemperature
      });
  }
  else{
    callback('Unable to fetch weather');
  }
  });
};

module.exports.getWeather = getWeather;
