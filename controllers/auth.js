const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Sign In',
        isAuthenticated: false
    });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
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

exports.postSignup = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const phoneno = req.body.phoneno;
    const password = req.body.password;
    const confirmPassword = req.body.confirmpassword;
    User.findOne({email: email})
    .then(userDoc => {
        if(userDoc) {
            return res.redirect('/signup');

        }
        const user = new User({
            name: username,
            email: email,
            phoneNumber: phoneno,
            password: password,
            myblogs: {
                blogs: []
            }
        });
        return user.save();

    })
    .then(result => {
        res.redirect('/login');
    })
    .catch(err => console.log(err));

};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};