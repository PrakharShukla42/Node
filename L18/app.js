const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const Product = require('./model/product');
const Review = require('./model/review');

const productRoutes = require('./router/product');
const reviewRoutes = require('./router/review');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(productRoutes);
app.use(reviewRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/E-com-SECAA')
    .then(() => console.log('DB connected'))
    .catch(() => console.log('DB not connected'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
