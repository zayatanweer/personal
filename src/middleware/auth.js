const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { default: mongoose } = require("mongoose");

// --------------Authentication------------

const authentication = async function (req, res) {

   try {
     let userName = req.body.emailId;
    let password = req.body.password;
    let user = await userModel.findOne({ emailId: userName, password: password });
    let token = jwt.sign(
        {
          userId: user._id.toString(),
          batch: "plutonium",
          organisation: "FunctionUp",
        },
        "zaya-17-secret.key"
      );
      res.setHeader("x-auth-token", token);
      res.status(201).send({ status: true, token: token });
    }catch(err){
      console.log(err)
    return res.status(401).send({ status: false, msg: err.messge });
    }
    };

// --------------Authorization------------

const authorization = async function (req, res, next) {
  
  try{
    let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(400).send({ status: false, msg: "Token must be present" });
  }
  let decodedToken = jwt.verify(token, "zaya-17-secret.key", (err, decode)=>{
    if (err){
        return res.status(401).send("You have enter invalid token")
    }(decode == true)
    next()
  });} catch(err){
    console.log(err)
    return res.status(500).send({ status: false, msg: err.messge });
  }
}

  // if (!decodedToken) {
  //   return res.send({ status: false, msg: "Token is invalid" });
  // }

  const authorization1 = async function (req, res, next) {
 try{
     let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    if (!token) {
      return res.status(400).send({ status: false, msg: "Token must be present" });
    }
    let decodedToken = jwt.verify(token, "zaya-17-secret.key")

  let userToBeModified = req.params.userId;
  let userLoggedin = decodedToken.userId;

  let isValid = mongoose.Types.ObjectId.isValid(userToBeModified)

  if(isValid === false){
    return res.status(401).send("lenth of the id is less then 24 digit or invalid userId")
  }
  else if (!decodedToken){
    return res.status(401).send({status: false, msg: "token is invalid"})
  }
  else if (userToBeModified != userLoggedin) {
    return res.status(403).send({
      status: false,
      msg: "user loggedin not allowed to modify changes",
    });
  }
  next();} catch(err){
    console.log(err)
    return res.status(500).send({ status: false, msg: err.messge });
  }
};

module.exports = { authentication, authorization, authorization1 };
