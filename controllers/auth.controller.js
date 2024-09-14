const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');

//handle errors
const handleErrors = (err) => {
    console.log(err.message);
    
    let errors = {name: '', email:'', password:''};

    if(err.message == 'Incorrect email'){
        errors.email = err.message; 
    }

    if(err.message == 'Incorrect password'){
        errors.password = err.password; 
    }

    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
        
    }

    //duplicate email
    if(err.code === 11000){
        errors.email = 'Email already exists';
        return errors;
    }

    return errors;
}

//create jwt token
const maxAge = 12 * 60 * 24 * 60;
const generateToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: maxAge});
}

const signupController = (req, res) => {
    const locals = {
        title: 'Sign Up',
        description: 'Sign up for an account'
    }

    res.render('signup',{locals: locals});
}

const singupPostController = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const user = await User.create({name, email, password});
        const token = generateToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({user: user._id});
    } catch (error) {
        const errors = handleErrors(error);
        res.status(422).json({errors})
    }
}

const loginController = (req, res) => {
    const locals = {
        title: 'Login',
        description: 'Login to your account'
    }

    res.render('login',{locals: locals});
}

const loginPostController =  async (req, res) => {
    const {email, password} = req.body;

    try { 

        const login = await User.login(email,password);
        const token = generateToken(login._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({user:login._id});
        
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({errors})
    }
}


const logoutController = (req, res) => {
    res.clearCookie('jwt', {path: '/'});
    res.redirect('/');
}

module.exports = {
    signupController,
    singupPostController,
    loginController,
    loginPostController,
    logoutController
}