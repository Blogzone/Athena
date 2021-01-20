const path = require('path');

const express = require('express');

const blogController = require('../controllers/blog');
const isAuth = require('../access-handlers/is-auth');

const router = express.Router();


router.get('/', blogController.getIndex);

router.get('/create-blog', isAuth, blogController.getCreateBlog);

router.get('/blogs/:articleId', isAuth, blogController.getBlog);

router.post('/create-blog', isAuth, blogController.postCreateBlog);

router.get('/topics', isAuth, blogController.getTopics);

router.get('/topics/webdev', isAuth, blogController.getWebdev);

router.get('/my-blogs/:userId', isAuth, blogController.getmyBlogs);

router.post('/my-blogs/delete-blog', isAuth, blogController.postDeleteBlogs);

router.get('/my-blogs/edit-blog/:blogId', isAuth, blogController.getEditBlog);

router.post('/edit-blog', isAuth, blogController.postEditBlog);

router.get('/my-account/:userId', isAuth, blogController.getmyAccount);



module.exports = router;