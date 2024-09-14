const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        res.redirect('/login');
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.redirect('/login');
    }
}


const checkCurrentUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.json({ user: null });
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
        if (err) {
            return res.json({ user: null });
        }
        let loginUser = await User.findById(user.id);
        res.locals.user = loginUser;
        next();
    });
}

module.exports = {requireAuth, checkCurrentUser};
