var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new mongoose.Schema({
    fname: {type: String, required: true},
    lname: {type: String},
    email: {type: String},
    phNumber: {type: String},
    dob: {type: String, required: true},
    password: {type: String, required: true},
    img: {data: Buffer, contentType: String}

});

userSchema.plugin(uniqueValidator, {message: 'is already taken.'});
var User = mongoose.model('myuser', userSchema);
module.exports = User;
