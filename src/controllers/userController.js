const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
 try{
   let data = req.body;
  let savedData = await userModel.create(data);
  res.status(201).send({ status: true, msg: savedData });}
  catch(err){
    res.status(500).send({msg: err.message})
  }
};

const loginUser = async function (req, res, next) {
try {  let userName = req.body.emailId;
  let password = req.body.password;
  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.status(400).send({
      status: false,
      msg: "username or the password is not corerct",
    }); else if (user.isDeleted == true){
      res.status(401).send("this account is deleted you cant log in, please create new account")
    }else{
      next()
    }} catch(err){
      res.status(500).send({msg: err.message})
    }
};

const getUserData = async function (req, res) {

 try {
   let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (user){
    return res.status(400).send({ status: false, msg: "No such user exists" });
  } else if ( user.isDeleted==true){
    res.status(401).send("This account is deleted from database so you can't fetch thier details")
  }

  res.status(201).send({ status: true, data: user });}
  catch(err){
    res.status(500).send({msg: err.message})
  }
};

const postUsers = async function (req, res) {
  try {
    let message = req.body.message;  
  let user = await userModel.findById(req.params.userId);
  if (!user) { 
    return res.status(400).send({ status: false, msg: "No such user exists" });
  }else if ( user.isDeleted==true){
    res.status(401).send("This account is deleted from database so you can't post msg")
  }else{
  let updatedPosts = user.posts;
  updatedPosts.push(message);
  let updatedUser = await userModel.findOneAndUpdate(
    { _id: user._id },
    { posts: updatedPosts },
    { new: true }
  );
  return res.status(201).send({ status: true, data: updatedUser });
};}
catch(err){
  res.status(500).send({msg: err.message})
}
}

const updateUser = async function (req, res) {
  try{
    let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) {
    return res.status(400).send("No such user exists");
  }else if( user.isDeleted==true){
    res.status(401).send("This account is deleted from database so you can't update this user")
  }else{
  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData,{new : true});
  res.status(201).send({ status: true, data: updatedUser });
};}
catch(err){
  res.status(500).send({msg: err.message})
}
}

const deleteUser = async function (req, res) {
  try {
    let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) {
    return res.status(400).send("No such user exists");
  } else if (user.isDeleted == true){
    res.status(403).send("This account is deleted you cant log in,please create new account")
  } else{
  let deleteUser = await userModel.findOneAndUpdate(
    { _id: userId },
    { isDeleted: true },
    { new: true }
  );
  res.status(201).send({ status: true, msg : "user deleted successfully", data: deleteUser });
}}
catch(err){
  res.status(500).send({msg: err.message})
}
};

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.getUserData = getUserData;
module.exports.postUsers = postUsers;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;


