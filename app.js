require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

const {requireAuth, checkCurrentUser} = require('./middleware/AuthMiddleware');

//port
const PORT = 5000 || process.env.PORT;

//db connection
const connectDB = require('./db');

const app = express();

//middleware
app.use(express.static('public'));

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.use(cookieParser());

//view engine
app.use(expressLayout);
app.set('layout', 'layouts/guest');
app.set('view engine', 'ejs');

connectDB();

//routes
app.use('/',require('./routes/guest.route'));
app.use('/', requireAuth,checkCurrentUser, require('./routes/auth.route'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
})