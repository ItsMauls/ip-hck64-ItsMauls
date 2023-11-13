const {getPosts, getPostById, deletePost } = require('../controllers/index')

const router = require('express').Router()

module.exports = 
router
.get('/posts', getPosts)
.get('/posts/:id', getPostById)
.delete('/posts/:id', deletePost)