const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

const vocabRoute = require('./routes/vocab')
const addWordRoute = require('./routes/addWord')
const x = 5;
//connect to Mongo DB
mongoose.connect('mongodb+srv://admin:ronitkhatri@vocab.mavsc.mongodb.net/Dictionary?retryWrites=true&w=majority',
{ useUnifiedTopology: true,useNewUrlParser: true })

//logs the incoming api requests.
app.use(logger('dev'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


// if(process.env.NODE_ENV === 'production'){
app.use(express.static('client/build'));
// }

//handling cors error

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization')
    
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,PATCH,DELETE")
        return res.status(200).json({})
    }
    next()
})
//Route to handle api requests.
app.use('/add',addWordRoute)
app.use('/home',vocabRoute)

//middleware to handle api requests to invalid routes.
app.use((req,res,next)=>{
    const error = new Error('Page Not Found!!')
    error.status = 404
    next(error)
})

//error handling
app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error : {
            message : error.message
        }
    })
})

module.exports = app
