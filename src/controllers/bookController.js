const { count } = require("console")
const BookModel = require("../models/bookModel");

const createBook = async function (req, res){
    let data = req.body
    let savedData = await BookModel.create(data)
    res.send({msg : savedData})
}

const getBooksData = async function(req, res) {
    let allBooks = await BookModel.find()
    res.send({ msg : allBooks})
}

const bookList = async function(req, res) {
    let allBooks = await BookModel.find().select({bookName:1, authorName:1, _id:0})
    res.send ({msg: allBooks})
}

const getBooksInYear = async function(req, res) {
    let publishingYear = req.body.year
    let allBooks = await BookModel.find({year : publishingYear})
    res.send({msg : allBooks})
}

const getParticularBooks = async function(req, res) {
    let fetch = req.body
    let allBooks = await BookModel.find(req. body)
    res.send ({msg : allBooks})
}

const getXINRBooks = async function(req, res) {
    let allBooks = await BookModel.find({$in: ["100INR", "200INR","500 INR"]})
    res.send({ msg: allBooks })
}


const getRandomBooks = async function (req, res) {
    let allBooks = await BookModel.find({ $or:[{stockAvailable:true},{totalPages:{$gt:500}}]})
    res.send({ msg : allBooks})
}
// module.exports = { createBook , getBooksData, listBook}

module.exports.createBook = createBook
module.exports.getBooksData = getBooksData
module.exports.bookList = bookList
module.exports.getBooksInYear = getBooksInYear
module.exports.getParticularBooks = getParticularBooks
module.exports.getXINRBooks = getXINRBooks
module.exports.getRandomBooks  = getRandomBooks