const express = require('express');
const app = express();
const PORT = 5000;
const product = require('./model/product');
const path = require('path');
const mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


mongoose.connect('mongodb://127.0.0.1:27017/ECommerce')
 .then(() => console.log('DB Connected...'))
 .catch(err => console.log("DB not Connected..."));

app.get('/product',async (req, res) => {
    let products = await product.find()
    res.render('products/index', {products});
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

