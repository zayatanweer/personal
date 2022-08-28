const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const middleware=require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

router.get("/getUsers/:userId", middleware.addMid,  userController.getUserData)

router.put("/putUsers/:userId", middleware.addMid,  userController.updateUser)

router.delete("/deleteUsers/:userId", middleware.addMid,  userController.deleteUser)

module.exports = router;