const request = require('request')

const forecast = (lati, longi, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f94d5ce579ecfc906b47cf0b322158bc&query='+ lati+','+ longi +'&units=m'
    //console.log(lati, longi)
    //console.log(url)
    request({url, json: true}, (error, {body} = {})=> {
        if(error){
            callback('Unable to connect to weather service', undefined)
        }else if(body.error){
           // console.log(body)
            callback('Unable to find the location', undefined)
        }else{
            //console.log(body.current.weather_descriptions[0])
            callback(undefined,'It is '+ body.current.weather_descriptions[0] + '. The temperature is '+ body.current.temperature + ' degrees. And it feels like ' + body.current.feelslike + ' out there.')
        }
    })

}

module.exports = forecast