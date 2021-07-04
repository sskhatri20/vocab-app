const express = require('express')
const router = express.Router();
const Dictionary = require('../models/dictionary')
const callApiSearch = require('./RequestSearch')

router.get('/',(req,res,next)=>{
    Dictionary.find().exec().then(docs => {
        res.write(JSON.stringify(docs));
        res.end();
    }).catch(err=>{
        res.status(500).json({
            error : err
        })
    })
    
})

router.get('/:word',(req,res,next)=>{
    const word = req.params.word
    callApiSearch.callApi(word,function(response){
        res.write(JSON.stringify(response));
        res.end();
    });
})

module.exports = router;