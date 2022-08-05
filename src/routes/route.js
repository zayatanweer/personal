const express = require('express');
const abc = require('../introduction/intro') 
const logger = require('../logger/logger')
const helper = require("../util/helper")
const formatter = require("../validator/formatter")
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    res.send('My second ever api!')
});


router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
logger.welc()

helper.currentDate()
helper.currentMonth()
helper.getBatch()


formatter.trim()
formatter.changeToLower()
formatter.changeToUpper()

module.exports = router;
// adding this comment for no reason