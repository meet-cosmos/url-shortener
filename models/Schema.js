const mongoose = require("mongoose");
const shortId = require("shortid")

const Schema =  mongoose.Schema

const ObjectID = Schema.ObjectID

const shortUrlSchema = new Schema({
    full : {
        type : String,
        require : true
    },
    short : {
        type : String,
        require : true,
        default : shortId.generate
    },
    clicks : {
        type : Number,
        require : true,
        default : 0
    }
})

const shortUrlModel = mongoose.model('shortUrl', shortUrlSchema)

module.exports = shortUrlModel