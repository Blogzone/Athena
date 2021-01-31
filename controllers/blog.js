const path = require('path');
const Blog = require('../models/blog');
const mongoose = require('mongoose');

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
    Blog.find().then(articles => {
        res.render('blog/topics', {
            pageTitle: 'Topics',
            countWebdev: articles.filter(blog => blog.topic === 'Webdev').length,
            countAppdev: articles.filter(blog => blog.topic === 'Appdev').length,
            countMl: articles.filter(blog => blog.topic === 'ML').length,
            countSystems: articles.filter(blog => blog.topic === 'Systems').length,
            countGamedev: articles.filter(blog => blog.topic === 'Gamedev').length,
            countCybersecurity: articles.filter(blog => blog.topic === 'Cybersecurity').length,
            path: '/topics',
            isAuthenticated: req.session.isLoggedIn,
            user: req.user,
            
        });

    }).catch(err => console.log(err));
   
    
    
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
    const imageURL = req.file.filename;
        
    const blog = new Blog({
        title: title,
        subtitle: subtitle,
        topic: topic,
        text: blogText,
        imageUrl: imageURL,
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
    // const blogId = mongoose.Types.ObjectId('600b1c198172d20ac0b341a0');
    // console.log(req.params.articleId);
    // console.log(req.params.articleId.length);
    
    Blog.findById(blogId).populate('userId')
    .then(article => {
        res.render('blog/blog', {
            blog: article,
            pageTitle: article.title,
            // path: '/blogs',
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
    const image = req.file;
    const user = req.user;

    Blog.findById(blogId)
    .then(blog => {
        blog.title = updatedTitle;
        blog.subtitle = updatedSubtitle;
        blog.topic = updatedTopic;
        blog.text = updatedblogText;
        if(image) {
            blog.imageUrl = image.filename
        }
        
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
    Blog.find({topic: 'Webdev'}).populate({path:'userId', select:'name' }).then(articles => {
        res.render('blog/articles', {
            blogs: articles,
            pageTitle: 'Webdev',
            isAuthenticated: req.session.isLoggedIn,
            user: req.user
        });

    }).catch(err => console.log(err));
    
};

exports.getAppdev = (req, res, next) => {
    Blog.find({topic: 'Appdev'}).populate({path:'userId', select:'name' }).then(articles => {
        res.render('blog/articles', {
            blogs: articles,
            pageTitle: 'Appdev',
            isAuthenticated: req.session.isLoggedIn,
            user: req.user
        });

    }).catch(err => console.log(err));
    
};

exports.getMl = (req, res, next) => {
    Blog.find({topic: 'ML'}).populate({path:'userId', select:'name' }).then(articles => {
        res.render('blog/articles', {
            blogs: articles,
            pageTitle: 'ML/AI',
            isAuthenticated: req.session.isLoggedIn,
            user: req.user
        });

    }).catch(err => console.log(err));
    
};

exports.getSystems = (req, res, next) => {
    Blog.find({topic: 'Systems'}).populate({path:'userId', select:'name' }).then(articles => {
        res.render('blog/articles', {
            blogs: articles,
            pageTitle: 'Systems',
            isAuthenticated: req.session.isLoggedIn,
            user: req.user
        });

    }).catch(err => console.log(err));
    
};

exports.getGamedev = (req, res, next) => {
    Blog.find({topic: 'Gamedev'}).populate({path:'userId', select:'name' }).then(articles => {
        res.render('blog/articles', {
            blogs: articles,
            pageTitle: 'Gamedev',
            isAuthenticated: req.session.isLoggedIn,
            user: req.user
        });

    }).catch(err => console.log(err));
    
};

exports.getCybersecurity = (req, res, next) => {
    Blog.find({topic: 'Cybersecurity'}).populate({path:'userId', select:'name' }).then(articles => {
        res.render('blog/articles', {
            blogs: articles,
            pageTitle: 'Cybersecurity',
            isAuthenticated: req.session.isLoggedIn,
            user: req.user
        });

    }).catch(err => console.log(err));
    
};
