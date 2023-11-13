const {User, Post} = require('../models/index')

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
    
            const selectedArticle = await Post.findByPk(id)
            if(!selectedArticle) {
                throw {name : 'NotFoundError', id}
            }
            res.status(200).json(selectedArticle)
        } catch (error) {
            next(error)
        }
    }
    
    static async postArticle(req,res,next) {
        try {
            const body = req.body
            body.userId = req.user.id
            const newData = await Article.create(body)
            res.status(201).json(newData)
        } catch (error) {
            next(error)
        }
    }

    static async updateArticle(req,res,next) {
        try {
            const { id } = req.params
            const {title, content, categoryId, authorId} = req.body
            const selectedArticle = await Article.findByPk(id)
            const body = {
                title,
                content,
                categoryId,
                authorId
            }
            if(!selectedArticle) {
                throw {name : 'NotFoundError', id}
            }
            if(!title) {
                throw {name : 'RequestBodyNotFound'}
            }
            if(!content) {
                throw {name : 'RequestBodyNotFound'}
            }
           
            if(!categoryId) {
                throw {name : 'RequestBodyNotFound'}
            }
            if(!authorId) {
                throw {name : 'RequestBodyNotFound'}
            }
           
            await Article.update(body, {
                where : {
                    id : id
                }
            })
            
            const updatedArticle = await Article.findByPk(id)
            
            res.status(200).json(updatedArticle)
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
            await Article.destroy({
                where : {
                    id : id
                }
            })
            res.status(200).json({msg : `${findByPk.caption} with id ${findByPk.id} has been deleted!`})
        } catch (error) {
            next(error)
        }
    }
    static async patchUpvote(req,res,next) {
        try {
            const findByPk = await Article.findByPk(id)
            // const imgUrl = req.user.uploadedImgUrl
            // const { id } = req.params
    
            // if(!findByPk) {
            //     throw {name : 'NotFoundError', id}
            // }
            // if(!imgUrl) {
            //     throw {name : 'RequestBodyNotFound'}
            // }
            // await Article.update({imgUrl : imgUrl}, {
            //     where : {
            //         id : id
            //     }
            // })
            // const updatedImageUrl = await Article.findByPk(id)
            // res.status(200).json(updatedImageUrl)
        } catch (error) {
            next(error)
        }
    }
}