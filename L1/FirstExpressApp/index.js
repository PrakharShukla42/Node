const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Working Fine!');
});

app.get('/about',(req,res)=>{
  res.send('This is the about page');
});

app.get('/contact',(req,res)=>{
  res.send('This is the contact page');
});

app.get('/projects',(req,res)=>{
  res.send('<h1>Multi Server Web Hosting</h1>');
});

app.get('/login',(req,res)=>{
  res.send('This is the login page');
})

app.get('/signup/:username/:password',(req,res)=>{
  console.log(req.params.username);
})

app.get('/*',(req,res)=>{
  res.status(404).send('Page not found');
})

app.listen(5000);

