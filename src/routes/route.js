const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const middleware=require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUsers", userController.createUser  )

router.post("/createLogin", userController.loginUser, middleware.authentication)

router.get("/getUsers/:userId", middleware.authorization,  middleware.authorization1, userController.getUserData)

router.put("/putUsers/:userId", middleware.authorization, middleware.authorization1, userController.updateUser)

router.post("/postUsers/:userId/posts", middleware.authorization, middleware.authorization1, userController.postUsers)

router.delete("/deleteUsers/:userId", middleware.authorization, middleware.authorization1, userController.deleteUser)

module.exports = router;