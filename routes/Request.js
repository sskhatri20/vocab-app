const request = require('request');
const mongoose = require('mongoose')
const Dictionary = require('../models/dictionary');
const { Mongoose } = require('mongoose');

const callExternalApiUsingRequest = (word,callback) => {
  _EXTERNAL_URL = 'https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/' + word
  const headers = {
    "Accept": "application/json",
    "app_id": "81ec237a",
    "app_key": "4a838aa9f65d79fb941cf85018da27f4"
  }
  const options = {
    method: 'GET',
    url: _EXTERNAL_URL,
    headers : headers
  }
    request(options, (err, res, body) => {
    if (err) { 
        console.log("errrrrrrr")
        return callback(err);
     }
    const data = JSON.parse(body)
    if(data.error){
      return callback("No entry found")
    }
    const dictionary = new Dictionary({
      _id : new mongoose.Types.ObjectId(),
      word : data.id,
      type : data.results[0].lexicalEntries[0].lexicalCategory.text,
      definition : data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0],
      example : data.results[0].lexicalEntries[0].entries[0].senses[0].examples ?data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text :  "not found"
    })
    dictionary.save().then(res=>console.log("success",res)).catch(err=>console.log(err))
    return callback("success");
    });
}

module.exports.callApi = callExternalApiUsingRequest;