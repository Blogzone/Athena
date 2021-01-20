const Blog = require('../models/blog');
const router = require('../routes/blog');


exports.getIndex = (req, res, next) => {
    Blog.find().populate({path:'userId', select:'name' })
    .then(articles => {          
        res.render('blog/main', {
            blogs: articles,
            pageTitle: 'Home',
            path: '/',
            isAuthenticated: req.session.isLoggedIn,
            
            user: req.user

        });
    })
    .catch(err => {
        console.log(err);

    });    
};

exports.getTopics = (req, res, next) => {
    res.render('blog/topics', {
        pageTitle: 'Topics',
        path: '/topics',
        isAuthenticated: req.session.isLoggedIn,
        user: req.user
    });
};

exports.getCreateBlog = (req, res, next) => {
    res.render('blog/create-blog', {
        pageTitle: 'Create-Blog',
        path: '/create-blog',
        isAuthenticated: req.session.isLoggedIn,
        user: req.user
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
    Blog.findById(blogId).populate('userId')
    .then(article => {
        res.render('blog/blog', {
            blog: article,
            pageTitle: article.title,
            path: '/blogs',
            isAuthenticated: req.session.isLoggedIn,
            user: req.user

        });
    })
    .catch(err => {
        console.log(err);
    });

    
};

exports.getmyAccount = (req, res, next) => {
    res.render('blog/my-account', {
        pageTitle: 'My-Account',
        path: '/my-account',
        isAuthenticated: req.session.isLoggedIn,
        user: req.user
    });
};

exports.getmyBlogs = (req, res, next) => {
    req.user.populate('myblogs.blogs.articleId').execPopulate()
    .then(user => {
        const articles = user.myblogs.blogs;
        res.render('blog/my-blogs', {
            blogs: articles,
            pageTitle: 'My Blogs',
            path: '/my-blogs',
            isAuthenticated: req.session.isLoggedIn,
            user: req.user
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.postDeleteBlogs = (req, res, next) => {
    const articleId = req.body.blogId;
    const user = req.user;
    user.removefromMyblogs(articleId).then(result => console.log("REMOVED FROM MY-BLOGS"));    
    Blog.findByIdAndRemove(articleId)
    .then(() => {
        console.log('BLOG DELETED');
        res.redirect('/my-blogs/user._id');
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
            blog: article,
            isAuthenticated: req.session.isLoggedIn,
            user: req.user
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
    const user = req.user;

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
        res.redirect('/my-blogs/user._id');
    })
    .catch(err => {
        console.log(err);
    });

};

exports.getWebdev = (req, res, next) => {
    res.render('blog/articles', {
        pageTitle: 'Webdev',
        isAuthenticated: req.session.isLoggedIn,
        user: req.user
    });
};

