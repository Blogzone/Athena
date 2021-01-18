const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Sign In',
        isAuthenticated: false
    });
};

exports.postLogin = (req, res, next) => {
    
    User.findById('60042d3d3e6a4e3984b77cd9')
    .then(user => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save((err) => {
            console.log(err);
            res.redirect('/');

        });     
        
    })
    .catch(err => console.log(err));
    

};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};