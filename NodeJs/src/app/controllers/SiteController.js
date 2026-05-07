const Course = require("../models/Course");
const Post = require("../models/Post");

class SiteController {
    // [GET] /home
    // Using async fun
    async index(req, res) {
        try {
            let data = await Course.find({});
            if (data) res.json(data);
        } catch (error) {
            res.json({ error: "Has error : " + error });
        }

        // res.render("home");
    }

    // [GET] /search
    async search(req, res) {
        try {
            let data = await Post.find({});
            if (data) res.json(data);
        } catch (error) {
            res.json({ error: "Has error : " + error });
        }
    }
}

module.exports = new SiteController();
