const authorModel = require("../models/authorModel")
const publisherModel= require("../models/publisherModel")
const bookModel= require("../models/bookModel")

const mongoose = require('mongoose')


// const createBook= async function (req, res) {
//     let data = req.body
//     let bookCreated = await bookModel.create(data)
//     let details = await bookModel.find().populate(['author_id', 'publisher_id'])
//     res.send({data :bookCreated, details})
// }

const createBook= async function (req, res) {
    let data = req.body
    let  { author_id, publisher_id} = data

    if(!author_id) return res.send({message:"Author_id is Mandatory"})   // required mandatory is same term (!mean) if not present
    if(!mongoose.Types.ObjectId.isValid(author_id)) return res.send({message:"Author_id is not valid object type"})

    if(!publisher_id) return res.send({message:"publisher_id is Mandatory"})
    if(!mongoose.Types.ObjectId.isValid(publisher_id)) return res.send({message:"publisher_id is not valid object type"})

    let bookCreated = await bookModel.create(data)
    let message = await bookModel.find({_id: author_id},{_id:publisher_id}).select({_id:1}).populate(['author_id', 'publisher_id'])
    return res.send({data :bookCreated})
}

const getAllBooks = async function (req, res) {
    let bookData = await bookModel.find().populate(['author_id', 'publisher_id']).limit(3)
    res.send({data:bookData})
}

const newUpdate = async function (req, res) {
    let data = await publisherModel.find({"name":["Penguin","HarperCollins"]}).select({_id:1})
    let update=await bookModel.updateMany({publisher_id:data},{isHardCover:true},{new:true})
    let newBookData = await authorModel.find({rating:{$gt:3.5}}).select({_id:1})
    let bookUpDate = await bookModel.updateMany({author_id:newBookData},{$inc:{price:+10}},{new:true})
    res.send({ update, bookUpDate })
}

// const createBook= async function (req, res) {
//     let book = req.body
//     let bookCreated = await bookModel.create(book)
//     res.send({data: bookCreated})
// }

module.exports.createBook= createBook

module.exports.getAllBooks= getAllBooks

module.exports.newUpdate= newUpdate
