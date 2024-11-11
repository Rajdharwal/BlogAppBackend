//import models
const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

//route handler
exports.createComment = async(req, res) =>{
    try {
        //fetch data from request body 
    const {post, user ,body} = req.body;
    //create comment object
    const comment = new Comment({
        post, user, body
    });

    //save the new comment into the database
    const saveComment = await comment.save();

    //find the post by ID, add the newcomment to its comment array
    const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: saveComment._id}}, {new:true})
                        .populate("comments") //populate the comments array with the comment document
                        .exec();

    res.status(200).json({
        post:updatedPost,
        message:"comment created successfully"
    })
        
    } catch (error) {
        res.status(500).json(
            {
                error:"error while creating comment"
                
            }
        )
        
    }
}

//getall comment handler
exports.deleteComment = async(req, res) =>{
    try {
        //fetch data from request
        const {post, comment} = req.body;
        //find and delete comment collection me se
        const deleteComment = await Comment.findOneAndDelete({post:post, _id:comment});
        //update the post collection
        const updatedPost = await Post.findByIdAndUpdate(post, {$pull: {comments: deleteComment._id}}, {new:true});

        res.status(200).json(
            {
                message:"comment deleted successfully",
            }
        )

        
    } catch (error) {
        res.status(500).json(
            {
                error:"error while comments post",
                
            }
        )
        
    }

}

//fetch all comments of a post
// exports.getAllComments = async(req, res) =>{
//     try {

//         const {post, comment}= req.body;
//         // const comments = await Comment.findById(post, {comments});
        
//     } catch (error) {
        
//     }
// }
