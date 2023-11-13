const {getPosts, getPostById, deletePost, createPost, updatePost } = require('../controllers/index')
const multer = require('multer')
const imageUpload = require('../middleware/imageUpload')
const storage = multer.memoryStorage()
const upload = multer({storage})

const router = require('express').Router()

module.exports = 
router
.get('/posts', getPosts)
.get('/posts/:id', getPostById)
.post('/posts/', upload.single('imageUrl'), imageUpload, createPost)
.put('/posts/:id',upload.single('imageUrl'),imageUpload, updatePost)
.delete('/posts/:id', deletePost)