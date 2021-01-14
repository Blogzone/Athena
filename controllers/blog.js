const Blog = require('../models/blog');


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
        text: blogText
    });
    blog.save()
    .then(result => {
        console.log('Created Blog!');
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    });

};

exports.getBlog = (req, res, next) => {
    res.render('blog/blog', {
        pageTitle: 'Title of the blog goes here',
        path: '/blogs'
    });
};

exports.getmyAccount = (req, res, next) => {
    res.render('blog/my-account', {
        pageTitle: 'My-Account',
        path: '/my-account'
    });
};

exports.getWebdev = (req, res, next) => {
    res.render('blog/articles', {
        pageTitle: 'Webdev'
    });
};