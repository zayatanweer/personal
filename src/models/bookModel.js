const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name: String,
    author_id: {
        type: ObjectId,
        ref: "AuthorDetails",
        required: true
    }, 
    price: Number,
    ratings: Number,
    publisher_id :{
        type : ObjectId,
        ref: "PublisherDetails",
        required: true
    },
    isHardCover: Boolean


}, { timestamps: true });


module.exports = mongoose.model('BookLibrary', bookSchema)
