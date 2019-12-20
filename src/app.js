const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
// Initialising express server
const app = express()
const port = process.env.PORT || 3000 //use PORT NO On Heroku
// Defining paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setting up handlebars view engine and views(view rendering )
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Serve Static web pages
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Home Page',
        name : 'Sarath'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        helpText: 'This is help Page',
        name: 'Sarath'
    })  
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
                name: 'Sarath'
    })
})
app.get('/about/*',(req,res)=>{
    res.render('404',{
        title: 'The page you are searching is not found',
        name : 'Sarath Kumar'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error : 'Please provide address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            res.send({
                error: error
            })
        }
        else{
            forecast(latitude,longitude,(error,message)=>{
                if(error){
                    res.send({
                        error:error
                    })
                }
                else{
                    res.send({
                        latitude: latitude,
                        longitude : longitude,
                        location: location,
                        forecast : message
                    })
                }
            })
        }
    })
    // res.send(
    //     {
    //         latitude : '40',
    //         longitude : '45',
    //         location : req.query.address
    //     }
    // )
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : "Page Not Found",
        name : "Sarath Kumar Mannam"
    })
})


app.listen(port,()=>{
    console.log('Server is up on port 3000!..')
})








