const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publisherController = require("../controllers/publisherController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor )

router.post("/createPublisherr", publisherController.createPublisher )

router.post("/createBook", bookController.createBook )

// router.post("/createBooks", bookController.createBooks )

router.get("/getAllBooks", bookController.getAllBooks )

router.put("/newUpdate", bookController.newUpdate )

// router.get("/getAuthorsData", authorController.getAuthorsData)

// router.get("/getBooksData", bookController.getBooksData)

// router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)

module.exports = router;