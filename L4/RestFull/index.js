const express = require('express');
const methodOverride = require('method-override');
const app = express();

const Users = require('./data/user');
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/users', (req, res) => {
    res.render('user', { Users });
});

app.get('/user/new', (req, res) => {
    res.render('new');
});

app.post('/users', (req, res) => {
    const { name, password, email, city } = req.body;
    const newUser = {
        id: Users.length,
        name,
        password,
        email,
        city
    };
    Users.push(newUser);
    res.redirect('/users');
});

app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    const user = Users.find(u => u.id == id);
    if (user) {
        res.render('userDetails', { user });
    } else {
        res.status(404).send('User not found');
    }
});

app.get('/user/edit/:id', (req, res) => {
    const { id } = req.params;
    const user = Users.find(u => u.id == id);
    if (user) {
        res.render('editUser', { user, id });
    } else {
        res.status(404).send('User not found');
    }
});

app.post('/user/edit/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, password, city } = req.body;

    const userIndex = Users.findIndex(u => u.id == id);

    if (userIndex !== -1) {
        Users[userIndex] = { id: parseInt(id), name, email, password, city };
        res.redirect('/users');
    } else {
        res.status(404).send('User not found');
    }
});

app.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = Users.findIndex(u => u.id == id);
    if (userIndex !== -1) {
        Users.splice(userIndex, 1);
        res.redirect('/users');
    } else {
        res.status(404).send('User not found');
    }
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
