const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  let data = req.body;
  let savedData = await userModel.create(data);
  res.send({ msg: savedData });
};

const loginUser = async function (req, res, next) {
  let userName = req.body.emailId;
  let password = req.body.password;
  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    }); else if (user.isDeleted == true){
      res.send("this account is deleted you cant log  in,please create new account")
    }else{
      next()
    }
};

const getUserData = async function (req, res) {

  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user){
    return res.send({ status: false, msg: "No such user exists" });
  } else if ( user.isDeleted==true){
    res.send("this user is deleted from database so you can't fetch thier details")
  }

  res.send({ status: true, data: user });
};

const postUsers = async function (req, res) {
  let message = req.body.message;  
  let user = await userModel.findById(req.params.userId);
  if (!user) { 
    return res.send({ status: false, msg: "No such user exists" });
  }else if ( user.isDeleted==true){
    res.send("this user is deleted from database so you can't post msg")
  }else{
  let updatedPosts = user.posts;
  updatedPosts.push(message);
  let updatedUser = await userModel.findOneAndUpdate(
    { _id: user._id },
    { posts: updatedPosts },
    { new: true }
  );
  return res.send({ status: true, data: updatedUser });
};}

const updateUser = async function (req, res) {
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) {
    return res.send("No such user exists");
  }else if( user.isDeleted==true){
    res.send("this user is deleted from database so you can't update this user")
  }else{
  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData,{new : true});
  res.send({ status: true, data: updatedUser });
};}

const deleteUser = async function (req, res) {
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) {
    return res.send("No such user exists");
  } else if (user.isDeleted == true){
    res.send("this account is deleted you cant log in,please create new account")
  } else{
  let deleteUser = await userModel.findOneAndUpdate(
    { _id: userId },
    { isDeleted: true },
    { new: true }
  );
  res.send({ status: true, msg : "user deleted successfully", data: deleteUser });
}};

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.getUserData = getUserData;
module.exports.postUsers = postUsers;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
