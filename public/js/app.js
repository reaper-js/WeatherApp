console.log('It is working and development is fun not gonna lie')

const weatherForm = document.querySelector('form')
const searchCity = document.querySelector('input')

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    const location = searchCity.value
    if(!location){
        document.getElementById('main').innerHTML = 'Please provide a location'
    }else{
        fetch('/weather?address='+location).then((response)=> {
            response.json().then((data = {error: 'There is an error'}) => {

                const arry = ['Cloudy', 'Thunderstorms', 'Rain', 'Rainy', 'Sunny']
                if(data.error){
                    document.getElementById('main').innerHTML = data.error
                }else{
                    document.getElementById('main').innerHTML = data.location + "<br>" + data.forecastData
                }
            })
        })
    }
})