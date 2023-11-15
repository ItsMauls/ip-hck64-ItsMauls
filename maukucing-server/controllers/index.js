const {User, Post, Upvote, Comment} = require('../models/index')

module.exports = class Index {
    static async getPosts(req,res,next) {
        try {  
            const {search, sort, page = 1, perPage = 10} = req.query
            const offset = (page - 1) * perPage
            const limit = +perPage
            let queryOption = {
                include : [{
                    model : User,
                    as : 'user',
                    attributes : {exclude : ['password']}
                }  
            ],
                limit : limit,
                offset : offset
            }
    
            if(search) {
                queryOption.where = {
                    title : {
                        [Op.iLike] : `%${search}%`
                    }
                }
            } 
            if(sort) {
                queryOption.order = [
                    (
                        ['createdAt', sort.toUpperCase() === 'ASC' ? 'ASC' : 'DESC']
                    )
                ]
            }
            const datas = await Post.findAll(queryOption)
            res.status(200).json(datas)
        } catch (error) {
           next(error)
        }
    }
    
    static async getPostById(req,res,next) {
        try {
            const { id } = req.params
    
            const selectedPost = await Post.findByPk(id)
            if(!selectedPost) {
                throw {name : 'NotFoundError', id}
            }
            res.status(200).json(selectedPost)
        } catch (error) {
            next(error)
        }
    }
    
    static async createPost(req,res,next) {
        try {
            const body = req.body
     
            const imageUrl = req.user.uploadedImgUrl
            body.userId = req.user.id
            body.imageUrl = imageUrl
      
            const newData = await Post.create(body)
          
            res.status(201).json(newData)
        } catch (error) {
            console.log(error.message);
            next(error)
        }
    }

    static async updatePost(req,res,next) {
        try {
            const { id } = req.params
            const {caption} = req.body
            const updateImageUrl = req.user.uploadedImgUrl
            body.imageUrl = imageUrl
            const selectedPost = await Article.findByPk(id)

            const body = {
                caption,
                imageUrl : updateImageUrl
            }

            if(!selectedPost) {
                throw {name : 'NotFoundError', id}
            }

            if(!caption) {
                throw {name : 'RequestBodyNotFound'}
            }

            if(!imageUrl) {
                throw {name : 'RequestBodyNotFound'}
            }
           
           
           
            await Article.update({body}, {
                where : {
                    id : id
                }
            })
            
            const updatedPost = await Article.findByPk(id)
            
            res.status(200).json(updatedPost)
        } catch (error) {
            next(error)
            
        }
    }
    static async deletePost(req,res,next) {
        try {
            const { id } = req.params
            const findByPk = await Post.findByPk(id)
            if(!findByPk) {
                throw {name : 'NotFoundError', id}
            }
            await Post.destroy({
                where : {
                    id : id
                }
            })
            res.status(200).json({msg : `${findByPk.caption} with id ${findByPk.id} has been deleted!`})
        } catch (error) {
            next(error)
        }
    }

    static async undoLike(req,res,next) {
        const {postId} = req.params
            const userId = req.user.id
            try {
                await Upvote.destroy({
                    where : {postId, userId}
                })
                
                    await Post.decrement('upvotesCount', {where : {id : postId}}) 
    
                res.status(200).json({msg : 'Post downvoted!'})
            } catch (error) {
                next(error)
            }
    }

    static async likePost(req,res,next) {
        try {
            const {postId} = req.params
            const userId = req.user.id
            
            const [existing, created] =  await Upvote.findOrCreate({
                where : {postId, userId},
                defaults : {postId , userId}
            })
            
            if(created) {
                await Post.increment('upvotesCount', {where : {id : postId}})
            }       

            res.status(200).json(existing)
        } catch (error) {
            console.log(error.message);
            next(error)
        }

    }

    static async commentPost(req,res,next) {
        try {
            const {postId} = req.params
            const userId = req.user.id
            let body = req.body
            body.postId = postId
            body.userId = userId
            
            const comment = await Comment.create(body)

            res.status(201).json(comment)
        } catch (error) {
            console.log(error.message);
            next(error)
        }
    }
    
}