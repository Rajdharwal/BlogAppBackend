const express = require("express");
const router = express.Router();

//import controllers
const {createComment, deleteComment} = require("../controllers/commentController");
const {createPost,getAllPosts} = require("../controllers/postController");
const {likePost,unlikePost} = require("../controllers/likeController");


//create routes
router.post("/comments/create", createComment);
router.post("/comments/delete", deleteComment)
router.post("/posts/create", createPost);
router.get("/posts",getAllPosts);
router.post("/likes/like",likePost);
router.post("/likes/unlike", unlikePost);



//export 
module.exports = router;