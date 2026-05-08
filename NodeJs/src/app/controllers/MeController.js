const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render("me/stored-courses", {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch((error) => next(error));
    }

    // async storedCourses(req, res) {
    //     try {
    //         let courses = await Course.find({});
    //         res.render("me/stored-courses", {
    //             courses: mutipleMongooseToObject(courses),
    //         });
    //     } catch (error) {
    //         res.json({ error: "Has error : " + error });
    //     }
    // }
}

module.exports = new MeController();
