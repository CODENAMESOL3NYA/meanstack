const mongoose = require('mongoose');
const {Provider}= require('../models/provider');

//Connection URI to MongoDB
const uri='mongodb://localhost:27017/provider_db';

//Connection to db(done async);
mongoose.connect(uri)
    .then(result=>{
        console.log(`Successful Connection !`);
    })
    .catch(error=>{
        console.log('Connection Failed',error)
    });

module.exports = Provider;