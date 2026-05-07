const Course = require("../models/Course");
const Post = require("../models/Post");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
    // [GET] /home

    // Using Promise function
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render("home", {
                    title: "Đây Là test",
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch((error) => next(error));
    }

    // Using async function
    // async index(req, res) {
    //     try {
    //         let courses = await Course.find({}).lean();
    //         res.render("home", {
    //             title: "đây là test",
    //             courses,
    //         });
    //     } catch (error) {
    //         res.json({ error: "Has error : " + error });
    //     }

    //     // res.render("home");
    // }

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
