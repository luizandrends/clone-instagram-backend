const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");

const routes = express.Router();
const upload = multer(uploadConfig);

const PostController = require("./app/controllers/PostController");
const LikeController = require("./app/controllers/LikeController");

//Posts
routes.post("/posts", upload.single("image"), PostController.store);
routes.get("/posts", PostController.index);

//Likes
routes.post("/posts/:id/like", LikeController.store);
module.exports = routes;
