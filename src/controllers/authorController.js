const { count } = require("console")
const BookModel= require("../models/bookModel")
const AuthorModel= require("../models/authorModel")
const { findOneAndUpdate } = require("../models/bookModel")

const createauthor= async function (req, res) {
    let data= req.body

    let savedData= await AuthorModel.create(data)
    res.send({msg: savedData})
}

const createbook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const getChetanBhagatBook = async function (req, res){
    let data = await AuthorModel.find({author_name : "Chetan Bhagat"}).select("author_id")
    // console.log(data)
    let bookData = await BookModel.find({author_id :data[0].author_id})
    res.send({ msg : bookData})
}

const authorOfBook = async function (req,res){
    let data = await BookModel.findOneAndUpdate({name:"Two states"}, {$set:{price:100}},{new:true})
    let authorData= await AuthorModel.find({author_id:data.author_id}).select("author_name")
    let price = data.price
    res.send({ msg: authorData,price})
}

const booksRange = async function (req, res) {
    let data = await AuthorModel.find( { price : { $gte: 50, $lte: 100} } ).select({ author_id:1});
    let bookData = data.map(x => x.author_id);
    const newData = await AuthorModel.find({author_id: bookData}).select({ author_name:1});
    res.send({ msg: newData})
}


module.exports.createAuthor= createauthor
module.exports.createBook= createbook
module.exports.getChetanBhagatBook = getChetanBhagatBook
module.exports.authorOfBook = authorOfBook
module.exports.booksRange = booksRange