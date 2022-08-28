const jwt = require("jsonwebtoken");

const addMid = async function (req, res, next) {
    
  let token = req.headers["x-auth-token"];
  if (!token) {
    return res.send({
      status: false,
      msg: "header must be persent",
    });
  }
  let decodedToken = jwt.verify(token, "zaya-17-11-secret-key");
  if (decodedToken) {
    next();
  } 
};
module.exports = { addMid };
