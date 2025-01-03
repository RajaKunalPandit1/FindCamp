const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose'); // it uses pbkdf2 algo for hashing due to it's platform
// independent whereas bcrypt is not

const UserSchema = new Schema({
    email :{
        type : String,
        required : true,
        unique : true
    }
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);