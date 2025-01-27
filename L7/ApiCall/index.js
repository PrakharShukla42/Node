const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set(path.join(__dirname, 'views'));
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

let blogs=[
    {
        id: 1,
        title: 'Blog 1',
        content: 'This is the first blog'
    },
    {
        id: 2,
        title: 'Blog 2',
        content: 'This is the second blog'
        
    },
    {
        id: 3,
        title: 'Blog 3',
        content: 'This is the third blog'
    }
]

app.get('/blogs', (req, res) => {
    res.render('app', { blogs });
});

app.get('/blogs/new', (req, res) => {
    res.render('new', { blogs });
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
