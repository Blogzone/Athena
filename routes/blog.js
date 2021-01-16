const path = require('path');

const express = require('express');

const blogController = require('../controllers/blog');

const router = express.Router();


router.get('/', blogController.getIndex);

router.get('/my-blogs/:userId');

router.get('/create-blog', blogController.getCreateBlog);

router.get('/blogs/:articleId', blogController.getBlog);

router.post('/create-blog', blogController.postCreateBlog);

router.get('/topics', blogController.getTopics);

router.get('/topics/webdev', blogController.getWebdev);

router.get('/my-blogs/:userId', blogController.getmyBlogs);

router.post('/my-blogs/delete-blog', blogController.postDeleteBlogs);

router.get('/my-blogs/edit-blog/:blogId', blogController.getEditBlog);

router.post('/edit-blog', blogController.postEditBlog);

router.get('/my-account/:userId', blogController.getmyAccount);



module.exports = router;