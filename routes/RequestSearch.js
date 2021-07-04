const request = require('request');


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
        return callback(JSON.parse(err));
     }
    return callback(JSON.parse(body));
    });
}

module.exports.callApi = callExternalApiUsingRequest;