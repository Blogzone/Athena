const bcrypt = require('bcryptjs');

const User = require('../models/user');
const mailtokens = require('../util/mail');

const mailjet = require ('node-mailjet')

.connect(mailtokens.API_KEY, mailtokens.API_SECRET);



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
            const request = mailjet
                .post("send", {'version': 'v3.1'})
                .request({
                "Messages":[
                    {
                    "From": {
                        "Email": "abhishekmisar2000@gmail.com",
                        "Name": "Abhishek"
                    },
                    "To": [
                        {
                        "Email": email,
                        "Name": username
                        }
                    ],
                    "Subject": "Welcome to Athena",
                    "TextPart": "Successful signup",
                    "HTMLPart": `<h1>Welcome to Athena! ${username}</h1><br /><h2>Anyone can write on Athena. Thought-leaders, artists, experts, and individuals with unique perspectives share their thinking here. You’ll find pieces by independent writers from around the campus, stories we feature and leading authors, and smart takes on our own suite of blogs and publications.</h2>!`,
                    "CustomID": "AppGettingStartedTest"
                    }
                ]
                })
                request
                .then((result) => {
                    console.log(result.body)
                })
                .catch((err) => {
                    console.log(err.statusCode)
                })
            
            
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