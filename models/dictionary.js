const mongoose = require('mongoose')

const dictionarySchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    word : String,
    type : String,
    definition: String,
    example : String
})

module.exports = mongoose.model('Dictionary',dictionarySchema)