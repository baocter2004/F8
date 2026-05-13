const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        name: { type: String, required: true, maxlength: 255, default: "" },
        description: { type: String, maxlength: 600 },
        thumbnail: { type: String, maxlength: 255 },
        videoId: { type: String, required: true },
        slug: { type: String, slug: "name", unique: true },
    },
    {
        timestamps: true,
    },
);

// Custom query helpers - docs : https://mongoosejs.com/docs/guide.html#query-helpers
CourseSchema.query.sortable = function (req) {
    if ("_sort" in req.query) {
        const isValidType = ["asc", "desc"].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : "desc",
        });
    }

    return this;
};

// Add Plugin
mongoose.plugin(slug);
CourseSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
});

module.exports = mongoose.model("Course", CourseSchema);
