const jwt = require('jsonwebtoken');

const checkIfAuth = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return next();
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return next();
        }

        return res.redirect('/dashboard');
    });
}


module.exports = {checkIfAuth};
