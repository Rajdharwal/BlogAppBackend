const Post = require("../models/postModel");

//create post handler
exports.createPost = async(req, res) =>{
    try {
        //fetch data 
        const {title, body} = req.body;
        //create post object
        const post = new Post({
            title, body
        });
        //save post into database
        const savedPost = await post.save();

        res.status(200).json(
            {
                post:savedPost,
                message:"post created successfully"
            }
        )
        
    } catch (error) {

        return res.status(400).json({
        error:"error while creting post"
        })
        
    }
}

exports.getAllPosts = async(req, res) =>{
   try {
    const posts = await Post.find().populate("likes").populate("comments").exec();

    res.json(
        {
            posts,
        }
    )
   } catch (error) {
       return res.status(400).json({
           error:"error while fetching post"
        })
   }
}

