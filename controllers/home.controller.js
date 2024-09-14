

const homeController = (req, res) => {
    const locals = {
        title: 'Home Page',
        description: 'Welcome to the home page!'
    }
    res.render('index', {locals});
}




module.exports = {
    homeController
}