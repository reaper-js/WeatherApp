const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

//paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

//Handlebar engine and Views location 
app.set('views' , viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)


//Static directory location
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {  
    res.render('index',{
        title: 'Weather',
        name: 'Bobsled Bonanza'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        name: 'Bobsled Bonanza',
        age: 22
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        help: 'HELP!',
        name: 'Bobsled Bonanza',
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            return res.send({address: req.query.address, location, forecastData })
    
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not Found!',
        name: 'Bobsled Bonanza'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        error: 'Page Not found. Please go back!',
        name: 'Bobsled Bonanza'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000.')
})