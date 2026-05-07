const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Post = new Schema({
    name: { type: String, maxLength: 255, default: "" },
    description: { type: String, maxLength: 500 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", Post);
