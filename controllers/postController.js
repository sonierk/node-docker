const Post = require('../models/postModel')

module.exports.getAllPosts = async(req, res)=>{
    try {
        const posts = await Post.find()
        console.log(posts);
        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: {
                posts
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail'
        })
    }
}

// localhost:3000/posts/:id
module.exports.getOnePost = async(req, res)=> {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail'
        })
    }
}

module.exports.createPost = async(req, res)=> {
    try {
        console.log(req);
        const post = await Post.create({title: req.body.title, body: req.body.body})
        res.status(200).json({
            status: 'success',
            data: {
                post,
            },
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail'
        })
    }
}

module.exports.updatePost = async(req, res)=> {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true,
        })
        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail'
        })
    }
}

module.exports.deletePost = async(req, res)=> {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: 'success',
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail'
        })
    }
}