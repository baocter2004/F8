const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const Course = new Schema(
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

// Add Plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
});

module.exports = mongoose.model("Course", Course);
