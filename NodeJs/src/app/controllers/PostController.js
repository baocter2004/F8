class PostsController {
    index(req, res) {
        res.render("posts");
    }
}

module.exports = new PostsController();
