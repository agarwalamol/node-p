const path = require('path')    // import the core node module, 'path'
const express = require('express')
const hbs =require('hbs')
const request = require('request')
const geocode = require('../src/utils/geocode.js')
const forecast = require('../src/utils/forecast.js')
//console.log(__dirname)   prints the folder path
//console.log(__filename) // prints the current fle path -D:\node-course\web-server\src\app.js
//console.log(path.join(__dirname,'../public'))     using core node module path and its function join


const app = express()           //generate application
const publicirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)  //set custom views directory

hbs.registerPartials(partialsPath)


app.use(express.static(publicirectoryPath))       //use this function to send static file. should be above app.get()

// console.log(app)
//app.com
//app.com/about
//app.com/help      -all these are multiple routes


//we use app.get() to set routes to serve different pages

app.get('', (req, res)=>{           //this will not get used when app.use() is placed above
//res.send('<html><h1>Hello Express!</h1></html>')  //serve static page
res.render('index',{
    title: 'Weather',
    name: 'Amol Agarwal'
})
})

// app.get('/help', (req, res)=>{
//     res.send([{             //sending array of obects
//         name: 'Amol',
//         age: 25
//     },
// { 
//     name: 'Lenovo',
//     age: 8
// }])
// })

// app.get('/about', (req, res)=>{
//     res.send('<h1>About Page!</h1>')
// })

app.get('/help', (req, res)=>{
res.render('help',{
    title: 'Help',
    name: 'Amol Agarwal'
})
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Amol Agarwal'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: 'Enter search address'
        })
    }

        geocode(req.query.address, (error,{place,latitude,longitude}={})=>{
            if(!error){
                forecast(latitude, longitude,(forecasterror,forecast)=>{
                if(forecasterror){
                    res.send({
                        error: forecasterror
                    })
                }else{
                    res.send({
                        location: place,
                        forecast: forecast
                    })
                }
            })
        }
        else
        res.send({
            error           //object property shorthand
        })
            
        })

    
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            Error: 'You must provide a search term'
        })
    }

    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Amol Agarwal',
        message: 'Help topic not found!'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Amol Agarwal',
        message: 'Page not found!'
    })
})


app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})