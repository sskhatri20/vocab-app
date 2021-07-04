const express = require('express')
const router = express.Router();
const apiCallFromRequest = require('./Request')

router.get('/:word',(req,res,next)=>{
    const word = req.params.word
    apiCallFromRequest.callApi(word,function(response){
        res.write(JSON.stringify(response));
        res.end();
    });
})



module.exports = router;