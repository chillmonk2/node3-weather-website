const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/21831f7d401de1fe1de71c154c874059/' + latitude + ',' + longitude
    console.log(url)
    request({ url , json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const tempCelsium = (body.currently.temperature - 32) * (5/9)
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + tempCelsium.toFixed(2) + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast