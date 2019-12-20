console.log('Client-Side JavaScript Started..')


//Get the form data
const weatherForm = document.querySelector('form')
const address = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
//Add listener 
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()//prevents browser from refreshing on event occuring
    console.log(address.value)
    fetchWeather(address.value)
})
const fetchWeather = (address) =>{
    const url = 'http://localhost:3000/weather/?address='+encodeURIComponent(address)
    message1.textContent = "Loading..."
    message2.textContent = ""
    fetch(url).then((response)=>{
    //fetched the response
    //conveting to json
    response.json().then((data)=>{
        if(data.error){
            // console.log(data.error)
            message1.textContent = data.error;
        }
        else{
        //     console.log(data.latitude)
        //     console.log(data.longitude)
        //     console.log(data.location)
        //     console.log(data.forecast)
        //
            message1.textContent = data.location
            message2.textContent = data.forecast
    }
        })
})
}