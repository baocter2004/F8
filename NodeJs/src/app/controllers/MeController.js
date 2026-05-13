const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        // Promise All
        Promise.all([
            Course.find({}).sortable(req),
            Course.countDocumentsWithDeleted({ deleted: true }),
        ])
            // Destructring
            .then(([courses, deleteCount]) => {
                res.render("me/stored-courses", {
                    courses: mutipleMongooseToObject(courses),
                    deleteCount,
                });
            })
            .catch(next);
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

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) => {
                res.render("me/trash-courses", {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();
