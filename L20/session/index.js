const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    res.send(req.session);
});

app.get('/setSession', (req, res) => {
    req.session.anme="temp name";
    req.session.age=25;
    req.session.mode="dark";
    res.send('Session Set');
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
