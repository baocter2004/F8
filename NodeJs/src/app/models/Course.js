const mongoose = require("mongoose");
var slug = require("mongoose-slug-updater");

const Schema = mongoose.Schema;
mongoose.plugin(slug);

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

module.exports = mongoose.model("Course", Course);
