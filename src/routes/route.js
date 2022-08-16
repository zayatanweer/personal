const express = require('express');
const router = express.Router();

router.get('/students/:name', function(req, res) {
    let studentName = req.params.name
    console.log(studentName)
    res.send(studentName)
})


// WRITE A POST API TO THE ABOVE take this as sample for array of persons :

//  you will be given an array of persons ( 1 .e an array of objects )
//  .. each person will have a ( name : String , age : Number , votingStatus : true / false
//  ( BooLean take input in query param as votingAge..and for all the people above that age ,
//    change votingStatus as true also return an array consisting of only the person that can

let persons= [
    {
    name: "AA",
    age: 20,
    votingStatus: false
  },
  {
    name: "BB",
    age: 25,
    votingStatus: false
  },
  {
    name: "CC",
    age: 23,
    votingStatus: false
  },
  {
    name: "DD",
    age: 25,
    votingStatus: false
  },
  {
      name: "EE",
      age: 22,
      votingStatus: false
  },
  {
      name : "FF",
      age: 80,
      votingStatus: false
  },
  {
    name: "GG",
    age: 40,
    votingStatus: false
  }
  ]

// router.post('/persons', function(res,req){
// inputAge = req.query.votingAge;
// persons.map(person =>(person.age > inputAge) ? person.votingStatus = true : person.votingStatus);
// let result = persons.filter(newPer => {if(newPer.votingStatus==true){return newPer.name}})

// res.send({data:result})
// })


  router.post('/persons', function(req,res) {
  
      let param = req.query;
      let age = param.age;
      let elegiblePerson = [];
      
     for(let i =0; i < persons.length ; i++){
        if(persons[i].age >= age){
             persons[i].votingStatus = true
            elegiblePerson.push(persons[i])  
        }
     }
  
    res.send(elegiblePerson)
            
  })

module.exports = router;