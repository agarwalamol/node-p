const request = require('request')

const geocode =(address, callback)=>{



    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?&limit=2&access_token=pk.eyJ1IjoiYW1vbGFnYXJ3YWxlY2UiLCJhIjoiY2s0MHJyNzByMDB6NjNlbjA0d2ZtdzM3cSJ9.e1GMMsN3oGhJWp-YnQUUmw'
    // request({url: url, json: true}, (error, response)=>{
        request({url: url, json: true}, (error, {body}={})=>{     // using object destructuring
    if(error){
        callback('Connectivity failure! Please check your network connection.',undefined)
    }
    // else if(response.body.features === null){
        else if(body.features.length ===0){
            
        callback('Place not found! Please try again!',undefined)
    }
    else{
        callback(undefined,{
            // latitude: response.body.features[0].center[1],
            // longitude: response.body.features[0].center[0],
            // place: response.body.features[0].place_name
            
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            place: body.features[0].place_name
        }
        )
        
        }
})
}

module.exports=geocode