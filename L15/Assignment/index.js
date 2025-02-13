const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Post = require('./models/post'); 
var methodOverride = require('method-override');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://127.0.0.1:27017/Assignment-13Feb')
    .then(() => { console.log('DB connected!'); })
    .catch(() => { console.log('DB not connected'); });

app.get('/posts', async (req, res) => {
    const posts = await Post.find({});
    res.render('post', { posts });
});

app.get('/posts/new', (req, res) => {
    res.render('new');
});

app.post('/posts', async (req, res) => {
    const { title, content, comments, tag } = req.body;
    await Post.create({ title, content, comments, tag });
    res.redirect('/posts');
});

app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.render('show', { post });
});

app.get('/posts/:id/edit', async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.render('edit', { post });
});

app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, comments, tag } = req.body;
    await Post.updateOne({ _id: id }, { title, content, comments, tag });
    res.redirect('/posts');
});

app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    await Post.deleteOne({ _id: id });
    res.redirect('back');
});

app.listen(4000, () => {
    console.log('Server running at port 4000');
});
