
const postController = (req, res) => {
    const locals = {
        title: 'posts',
        description: 'blog post lists!'
    }
    res.render('post',{locals});
}


module.exports = {
    postController
}