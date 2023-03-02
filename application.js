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

mongoose.connect(keys.mongoURI).then(() => console.log("MongoDB connected", keys.mongoURI)).catch(error => console.log(error))

app.use(passport.initialize())
passportFunction(passport)

app.use(logs.logsAPI);

app.get("/", function (request, response) { response.sendFile(__dirname + "/assets/html/loginPage.html") });

app.use('/photos', express.static(`assets/img`));// Статическая папка

app.use("/redirect", function (request, response) { response.redirect("https://metanit.com") }); // переадресация

app.use('/api/authorisation', authorisationRoutes);
//токен в заголовок ключ Authorization Bearer eyJhbG...X31rD2ru_xwwhX8

const sendInvite = require('./services/newUserInvate/sendMail')
let link = "ya.ru"
// sendInvite.sendMail('email@blablabla', link)

module.exports = app;
// send(). В качестве параметра может принимать объект Buffer, строку, в том числе с html-кодом, объект javascript или массив.