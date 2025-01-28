const express = require('express');
const app = express();

const mongoose = require('mongoose');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/RestfullWithMongoose')
  .then(() => console.log('DB Connected!'))
  .catch(error => console.error('DB not connected:', error));


const Product = require('./model/Product');

app.get('/products', async (req, res) => {
  const products = await Product.find({});
  res.render('product', { products });
});

app.get('/product/new', (req, res) => {
  res.render('new');
});

app.post('/products', async (req, res) => {
  const { name, image, price, desc } = req.body;
  await Product.create({ name, image, price, desc });
  res.redirect('/products');
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('show', { product });
});


app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('edit', { product });
});

app.post('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, image, price, desc } = req.body;
  await Product.findByIdAndUpdate(id, { name, image, price, desc });
  res.redirect(`/products/${id}`);
});

app.listen(4000, () => {
  console.log('Server running at port 4000');
});
