const express = require('express');
const app = express();
const User = require('./model/user');
const session = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://127.0.0.1:27017/authDB')
  .then(() => console.log('Connected!'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 2 * 60000}
}));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

let isLogedin = (req, res, next) => {
    let user = req.session.user_id;
    if (user) {
        next();
    } else {
        res.redirect('/login');
    }
};

app.get('/', isLogedin, (req, res) => {
    res.render('home');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;
    const user = await User.findOne({ username });

    if (user) {
        res.redirect('/signup');
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        await User.create({ username, password: hashPassword, email });
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)){
        req.session.user_id = username;
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

app.listen(4000, () => {
    console.log('Server running at port 4000');
});
