const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");

class CourseController {
    // [GET] /courses/:slug
    // Using Promise function
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render("courses/show", {
                    course: mongooseToObject(course),
                });
            })
            .catch((error) => next(error));
    }

    // Using async function
    // async show(req, res) {
    //     try {
    //         let course = await Course.findOne({slug: req.params.slug}).lean();
    //         res.render("courses/show", {
    //             course,
    //         });
    //     } catch (error) {
    //         res.json({ error: "Has error : " + error });
    //     }

    //     // res.render("courses/show");
    // }

    // [GET] /courses/create
    create(req, res, next) {
        res.render("courses/create");
    }

    // [Post] /courses/store
    store(req, res, next) {
        req.body.thumbnail = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        let course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect("/me/stored/courses"))
            .catch((error) => {
                console.log(error);
                res.status(500).send("Error");
            });
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        const course = Course.findOne({ _id: req.params.id })
            .then((course) => {
                if (!course) {
                    return res.status(404).send("Course not found");
                }
                res.render("courses/edit", {
                    course: mongooseToObject(course),
                });
            })
            .catch((error) => next(error));
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        let formData = req.body;
        Course.updateOne({ _id: req.params.id }, formData)
            .then(() => res.redirect("/me/stored/courses"))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        let formData = req.body;
        Course.restore({ _id: req.params.id }, formData)
            .then(() => res.redirect("/me/trash/courses"))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect("/me/stored/courses"))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect("/me/trash/courses"))
            .catch(next);
    }

    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        console.log(req.body);

        switch (req.body.action) {
            case "delete":
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then((result) => {
                        res.redirect("/me/stored/courses");
                    })
                    .catch(next);
                break;
            case "restore":
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then((result) => {
                        res.redirect("/me/trash/courses");
                    })
                    .catch(next);
                break;
            case "force-delete":
                Course.deleteMany({ _id: { $in: req.body.courseIds } })
                    .then((result) => {
                        res.redirect("/me/trash/courses");
                    })
                    .catch(next);
                break;
            default:
                res.json({ message: "action invalid!" });
        }
    }
}

module.exports = new CourseController();
