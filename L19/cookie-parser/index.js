const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser('secretKey'));

app.get('/', (req, res) => {
    res.send("Working Fine")
});

app.get('/store', (req, res) => {
    res.cookie('discount',10000, {signed: true}).send('Store Visited');
});

app.get('/buyproduct', (req, res) => {
    let productprice = 40000;
    // let price = req.cookies.price;
    // if (price >= productprice) {
    //     res.send('Product Purchased');
    // } else {
    //     res.send('Insufficient Balance');
    // }
    let discount = req.signedCookies.discount;
    if (discount){
        productprice -= discount;
        res.send(`Product Price is ${productprice}`);
    } else {
        res.send('Insufficient Balance');
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});