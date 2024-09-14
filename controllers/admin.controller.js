const adminLayout = '../views/layouts/auth';
const jwt = require('jsonwebtoken');

const adminController = (req, res) => {
    const locals = {
        title: 'Dashboard',
        description: 'Welcome to the admin dashboard!'
    }
    res.render('admin/dashboard',{locals, layout: adminLayout});
}


module.exports = {
    adminController
}