const request = require('request')

const forecast =(latitude,longitude,callback)=>{
const url = 'https://api.darksky.net/forecast/6255c64a5a03768a4ec3eefe4935dbdd/'+latitude+','+longitude+'?units=si'

// request({url:url, json: true}, (error, response)=>{
    request({url:url, json: true}, (error, {body}={})=>{
if(error){
    console.log(error)
    callback('Check network connection! Unable to connect to weather service',undefined)
}
// else if(response.body.error){
    else if(body.error){              //using object destruct.
    callback('Values not correct, Please try another place.',undefined)
}
else{
    // callback(undefined, response.body.daily.data[0].summary+' It is currently ' +response.body.currently.temperature+ ' degrees Celsius out. There is '+response.body.currently.precipProbability+ ' % chance of rain.')
    callback(undefined, body.daily.data[0].summary+' It is currently ' +body.currently.temperature+ ' degrees Celsius out. There is '+body.currently.precipProbability+ ' % chance of rain. The UV Index is '+body.daily.data[0].uvIndex+'.')
}
})
}
module.exports = forecast