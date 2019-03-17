const request = require('request');

var geocodeAddress = (address, callback) =>{

const gaddress = encodeURIComponent(address);

request({
  url: 'http://www.mapquestapi.com/geocoding/v1/address?key=EJxYhRp4yPGAqYKdeVXhA6aqhbMZciu8&location='+ gaddress ,     //'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia',
  json: true
}, (error, response, body) => {
if(error){
  callback("Unable to connect to Google servers.");
}
else{
  callback(undefined,{
    address: body.results[0].providedLocation.location,
    latitutde: body.results[0].locations[0].latLng.lat,
    longitude: body.results[0].locations[0].latLng.lng
  });

}
});

};

module.exports.geocodeAddress=geocodeAddress;
