exports.getIndex = (req, res, next) => {
    res.render('blog/main',{
        pageTitle: 'Home',
        path: '/'

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