const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { default: mongoose } = require("mongoose");

// --------------Authentication------------

const authentication = async function (req, res) {
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
      res.send({ status: true, token: token });
    };

// --------------Authorization------------

const authorization = async function (req, res, next) {
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];
  if (!token) {
    return res.send({ status: false, msg: "Token must be present" });
  }
  let decodedToken = jwt.verify(token, "zaya-17-secret.key", (err, decode)=>{
    if (err){
        return res.send("you have enter invalid token")
    }(decode == true)
    next()
  });

  // if (!decodedToken) {
  //   return res.send({ status: false, msg: "Token is invalid" });
  // }
}

  const authorization1 = async function (req, res, next) {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    if (!token) {
      return res.send({ status: false, msg: "Token must be present" });
    }
    let decodedToken = jwt.verify(token, "zaya-17-secret.key")

  let userToBeModified = req.params.userId;
  let userLoggedin = decodedToken.userId;

  let isValid = mongoose.Types.ObjectId.isValid(userToBeModified)

  if(isValid === false){
    return res.send("lenth of the id less then 24 digit")
  }
  else if (!decodedToken){
    return res.send({status: false, msg: "token is invalid"})
  }
  else if (userToBeModified != userLoggedin) {
    return res.send({
      status: false,
      msg: "user loggedin not allowed to modify changes",
    });
  }
  next();
};

module.exports = { authentication, authorization, authorization1 };
