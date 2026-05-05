const express = require("express");
const router = express.Router();

const postsRouter = require("../app/controllers/PostController");

// postController.index
router.use("/", postsRouter.index);

module.exports = router;