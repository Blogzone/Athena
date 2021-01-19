const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Sign In',
        isAuthenticated: false,
        errorFlash: req.flash('error')
    });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false,
        errorFlash: req.flash('error')
    });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
    .then(user => {
        if(!user) {
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/login');

        }
        bcrypt.compare(password, user.password)
        .then(matching => {
            if(matching) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save((err) => {
                    console.log(err);
                    res.redirect('/');
        
                });
                
            }
            req.flash('error', 'Invalid email or password.');
            res.redirect('/login')
        })
        .catch(err => {
            console.log(err);
            res.redirect('/login');
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
            req.flash('error', 'There is already an account associated with this email, Please choose a different email or login with the existing one.');
            return res.redirect('/signup');

        }
        return bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                name: username,
                email: email,
                phoneNumber: phoneno,
                password: hashedPassword,
                myblogs: {
                    blogs: []
                }
            });
            return user.save();
        })
        .then(result => {
            res.redirect('/login');
        })
        

    })
    
    .catch(err => console.log(err));

};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};