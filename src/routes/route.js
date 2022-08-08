const express = require('express');
const _ = require('underscore');
const lodash = require('lodash');

const abc = require('../introduction/intro')
const loggerModule = require('../logger/logger.js')
const formatterModule = require('../validator/formatter') 
const helperModule = require('../util/helper')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    loggerModule.printInfo()
    formatterModule.trimMyString()
    formatterModule.getUpperCaseString()
    formatterModule.changetoLowerCase()
    helperModule.getTodaysDate()
    helperModule.getCurrentMonth()
    helperModule.printBatchDetails()
    let weekdend = ['Saturday','Sunday','Monday']
    let result = _.first(weekdend, 2)
    console.log('Unserscore example resultr is ',result)
    res.send('My second ever api!')
});


router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})


router.get('/test-me1', function(req, res){
    res.send('This is my new route handeler')

const arr =[ "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
let subArr = lodash.chunk(arr, 3);
console.log('new sub array', subArr)

const getOdd =[3, 5, 7, 9, 11, 13, 15, 17, 19, 21];
let findOdd = lodash.tail(getOdd);
console.log('return 9 odd number', findOdd);

const arr1 = [1, 4, 7, 8];
const arr2 = [5, 3, 4, 6];
const arr3 = [1, 2, 9, 5];
const arr4 = [7, 1, 12, 31];
let newArr = lodash.union(arr1, arr2, arr3, arr4);
console.log('delete duplicate array', newArr);

const array =  [['horror','The Shining'], ['drama', 'Titanic'], ['thriller','Shutter Island'], ['fantasy', 'Pans Labyrinth']];

let arrToObj = lodash.fromPairs(array);
console.log('return array to oject', arrToObj)

})



router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason