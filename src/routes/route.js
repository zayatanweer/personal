const express = require('express');
const router = express.Router();
const BookModel= require("../models/bookModel")
// const BookController= require("../controllers/bookController")
const AuthorModel= require("../models/authorModel")
const AuthorController= require("../controllers/authorController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createBook", AuthorController.createBook  )
router.post("/createAuthor", AuthorController.createAuthor )
router.get("/getChetanBhagatBook", AuthorController.getChetanBhagatBook )
router.get("/authorOfBook", AuthorController.authorOfBook )
router.get("/booksRange", AuthorController.booksRange )


module.exports = router;