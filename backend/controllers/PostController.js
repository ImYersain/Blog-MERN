import PostModel from '../models/Post.js';

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imagerUrl: req.body.imageUrl,

            user: req.userId,
        });

        const post = await doc.save();
        res.json(post);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'failed to create post'
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'failed to get posts'
        })
    }
}

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();
        const tags = posts.map(obj => obj.tags).flat().slice(0,5);
        res.json(tags);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'failed to get posts'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        
        PostModel.findOneAndUpdate({
            _id: postId
        },
        {
            $inc: { viewsCount: 1 }
        },
        {
            returnDocument: 'after'
        },
        (err,doc) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                message: 'failed to return post'
                }); 
            }
            if(!doc){
                return res.status(404).json({
                    message: 'post not found'
                });
            }
            res.json(doc);
        }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'failed to get posts'
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findOneAndDelete({
            _id: postId
        },
        (err, doc) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                message: 'failed to delete post'
                }); 
            }
            if(!doc){
                return res.status(404).json({
                    message: 'post not found'
                })
            }
            res.json({
                success: true
            })
        })
      
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Can not to delete post'
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;
        await PostModel.updateOne({
            _id: postId
        },
        {
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imagerUrl: req.body.imageUrl,
            user: req.userId,
        })
        res.json({
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Can not to update post'
        })
    }
}