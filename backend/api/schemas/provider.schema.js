const mongoose = require( 'mongoose' );

//Define a Schema
const Schema = mongoose.Schema;

//Create company schema (child or sub-document of Provider Schema);
const companySchema = new Schema({
    company_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50
    },
    address2: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 50
    },
    city: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    state: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 2
    },
    postal_code: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 5
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 10,
        match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    },
    description: {
        type: String,
        trim: true,
    },
    tagline: {
        type: String,
        trim: true,
    }
})

//Create a Provider Schema
const providerSchema = new Schema( {
    firstname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    position: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    company: companySchema
}, { timestamps: true } )

module.exports = {providerSchema,companySchema};