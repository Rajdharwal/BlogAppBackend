const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.likePost = async(req, res) =>{
    try {
        //fetch data 
        const {post, user} = req.body;
        //create like object
        const like = new Like(
            {
                post, user
            }
        )
        //save like data to database
        const savedLike = await like.save()

        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id}}, {new:true})
                            .populate("likes").exec();

        res.json({
            post:updatedPost,
            message:"Post like successfully",
        })
        
    } catch (error) {
        res.status(500).json(
            {
                error:"error while liking post"
                
            }
        )
        
    }
}


exports.unlikePost = async(req, res)=>{
    try {
        //fetch id of post like
        const {post, like} = req.body;

        //find and delete the like collection me se
        const deletedLike = await Like.findOneAndDelete({post:post, _id:like});
        //update the post collection
        const updatePost = await Post.findByIdAndUpdate(post, {$pull: {likes: deletedLike._id}},{new:true});

        res.json({
            post:updatePost,
        })
    
        
    } catch (error) {
        res.status(500).json(
            {
                error:"error while unliking post",
                
            }
        )
        
    }
}