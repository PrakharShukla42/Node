const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));  // Important

app.get('/', (req, res) => {
  res.render('home', {
    title: 'My Express App',
    message: 'This is a dynamic message from the server!',
  });
});

app.get('/signup', (req, res) => {
  res.render('signup', {
    title: 'Signup Page',
  });
});

app.get('/kuchh', (req, res) => {
  res.send('Kuchh toh yaar!');
});

app.get('/login',(req,res)=>{
    res.render('login');
})

app.post('/login',(req,res)=>{
    console.log(req.body);
    res.send('Form submitted');
})
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
