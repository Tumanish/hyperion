const fs = require("fs")
const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport');
const favicon = require("serve-favicon")
const path = require('path')

const keys = require('./configuration/keys')// адресс MongoDB , salt for jwt
const authorisationRoutes = require('./routes/authorizationRoutes')
const passportFunction = require('./services/passport')
const logs = require('./services/logs')

const app = express();

app.use(favicon(path.join(__dirname, 'assets/img', 'favicon.ico')))
app.use(morgan('dev'))
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// mongoose.set('strictQuery', false) //предупреждение перед версией 7.0.0 mongoose
mongoose.connect(keys.mongoURI).then(() => console.log("MongoDB connected", keys.mongoURI)).catch(error => console.log(error))

app.use(passport.initialize())
passportFunction(passport)

app.use(logs.logsAPI);

app.get("/", function (request, response) {response.sendFile(__dirname + "/assets/html/loginPage.html")});

app.use('/photos', express.static(`assets/img`));// Статическая папка

app.use("/redirect", function (request, response) { response.redirect("https://metanit.com") }); // переадресация

// http://localhost:3000/api/authorisation/login
// http://localhost:3000/api/authorisation/register
// http://localhost:3000/api/authorisation/test
app.use('/api/authorisation', authorisationRoutes);
//токен суется в заголовок ключ Authorization 
//Bearer eyJhbG...X31rD2ru_xwwhX8

// app.get('/api/test', (req, res) => { res.status(200).json({ messge: " It's alive!" }) }) // test api
module.exports = app;

// send(). В качестве параметра может принимать объект Buffer, строку, в том числе с html-кодом, объект javascript или массив.