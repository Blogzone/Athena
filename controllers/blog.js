const Blog = require('../models/blog');
const router = require('../routes/blog');


exports.getIndex = (req, res, next) => {
    Blog.find()
    .then(articles => {
        res.render('blog/main', {
            blogs: articles,
            pageTitle: 'Home',
            path: '/',

        });
    })
    .catch(err => {
        console.log(err);

    });    
};

exports.getTopics = (req, res, next) => {
    res.render('blog/topics', {
        pageTitle: 'Topics',
        path: '/topics'
    });
};

exports.getCreateBlog = (req, res, next) => {
    res.render('blog/create-blog', {
        pageTitle: 'Create-Blog',
        path: '/create-blog'
    });
};

exports.postCreateBlog = (req, res, next) => {
    const title = req.body.title;
    const subtitle = req.body.subtitle;
    const topic = req.body.topic;
    const blogText = req.body.blog;
    const blog = new Blog({
        title: title,
        subtitle: subtitle,
        topic: topic,
        text: blogText,
        userId: req.user
    });
    blog.save().then(blog => {
        return req.user.addtoMyblogs(blog);
        
    })
    .then(result => {
        console.log('Created Blog!');
        res.redirect('/');
        
    })
    .catch(err => {
        console.log(err);
    });

};

exports.getBlog = (req, res, next) => {
    const blogId = req.params.articleId;
    Blog.findById(blogId)
    .then(article => {
        res.render('blog/blog', {
            blog: article,
            pageTitle: article.title,
            path: '/blogs'
        });
    })
    .catch(err => {
        console.log(err);
    });

    
};

exports.getmyAccount = (req, res, next) => {
    res.render('blog/my-account', {
        pageTitle: 'My-Account',
        path: '/my-account'
    });
};

exports.getmyBlogs = (req, res, next) => {
    Blog.find()
    .then(articles => {
        res.render('blog/my-blogs', {
            blogs: articles,
            pageTitle: 'My Blogs',
            path: '/my-blogs'
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.postDeleteBlogs = (req, res, next) => {
    const articleId = req.body.blogId;
    Blog.findByIdAndRemove(articleId)
    .then(() => {
        console.log('BLOG DELETED');
        res.redirect('/my-blogs/1');
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getEditBlog = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }
    const articleId = req.params.blogId;
    Blog.findById(articleId)
    .then(article => {
        if(!article) {
            return res.redirect('/');
        }
        res.render('blog/edit-blog', {
            pageTitle: 'Edit Blog',
            path: '/my-blog/edit-blog',
            editing: editMode,
            blog: article
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.postEditBlog = (req, res, next) => {
    const blogId = req.body.blogId;
    const updatedTitle = req.body.title;
    const updatedSubtitle = req.body.subtitle;
    const updatedTopic = req.body.topic;
    const updatedblogText = req.body.blog;

    Blog.findById(blogId)
    .then(blog => {
        blog.title = updatedTitle;
        blog.subtitle = updatedSubtitle;
        blog.topic = updatedTopic;
        blog.text = updatedblogText;
        return blog.save();
    })
    .then(result => {
        console.log('UPDATED BLOG');
        res.redirect('/my-blogs/1');
    })
    .catch(err => {
        console.log(err);
    });

};

exports.getWebdev = (req, res, next) => {
    res.render('blog/articles', {
        pageTitle: 'Webdev'
    });
};

