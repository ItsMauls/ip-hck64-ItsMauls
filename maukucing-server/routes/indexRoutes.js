const {getPosts, getPostById, deletePost, createPost, updatePost, likePost, undoLike, commentPost, myPosts, seeComment, hotPosts } = require('../controllers/index')
const multer = require('multer')
const imageUpload = require('../middleware/imageUpload')
const router = require('express').Router()
const storage = multer.memoryStorage()
const upload = multer({storage})


module.exports = 
router
.get('/posts', getPosts)
.get('/posts/:id', getPostById)
.post('/posts/', upload.single('imageUrl'), imageUpload, createPost)
// .put('/posts/:id',upload.single('imageUrl'),imageUpload, updatePost)
.delete('/posts/:id', deletePost)
.patch('/like-posts/:postId', likePost)
.patch('/undo-like-posts/:postId', undoLike)
.post('/posts-comment/:postId', commentPost)
.get('/myposts', myPosts)
.get('/comments/:postId', seeComment)
.get('/hotposts', hotPosts)