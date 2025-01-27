const express = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/SEC-AA')
  .then(() => console.log('DB Connected!'))
  .catch((err) => console.log('DB not connected', err));

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    password: String,
    city:String
});

const User = mongoose.model('User', userSchema);

User.create({
    name: 'Prakhar',
    age: 20,
    password: '123',
    city: 'Mathura'
}).then(()=>{console.log('Document Created Sucessfully')})

User.find({
    city: 'Mathura'
}).then(()=>{console.log('Data Found')})

User.updateOne({
    name: 'Prakhar'
    }, {
    age: 21
}).then(()=>{console.log('Data Updated')})

User.deleteOne({
    name: 'Prakhar'
}).then(()=>{console.log('Data Deleted')})


app.listen(4000);