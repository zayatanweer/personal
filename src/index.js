const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();
const moment = require('moment');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://zaya-tanweer:zaya-tanweer@cluster0.bbotzin.mongodb.net/19Aug?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use (
    function (req, res, next) {
        console.log ("inside GLOBAL MW");
        next();
  }
  );


app.use (function (req, res, next){
    const currentDate = moment().format('YYYY-MM-DD HH:MM:SS');
    // const currentDate = new Date;
    const ip = req.ip;
    const url = req.originalUrl
    console.log(currentDate, ",", ip, ",", url);
    next()
})

app.use('/', route);



app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
