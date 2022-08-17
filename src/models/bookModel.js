const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName :{
               type : String,
               required : true
            },
    authorName: String, 
    tags: [String],
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    year : {
        type : Number,
        default : 2021
    },
    totalPages : Number,
    stockAvailable : Boolean,
    sales: {
        type: Number, 
        default: 10
    },
}, { timestamps: true });


module.exports = mongoose.model('Book1', bookSchema)