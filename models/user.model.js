const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Name is required']
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate:[isEmail, 'Please enter a valid email address']
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, "Passoword must be at least 6 characters"],
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now,
        required: false
    }
});

// UserSchema.post('save', function (doc, next) {
//     console.log('new user created', doc);
    
//     // next();
// })


UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//login method
UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email}); 
    if(user){
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            return user;
        }

        throw Error('Incorrect password');
        
    }
    throw Error('Incorrect email');
}

// UserSchema.methods.comparePassword = async function (candidatePassword) {

module.exports = mongoose.model('user', UserSchema);