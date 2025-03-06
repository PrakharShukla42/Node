const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Working Fine!');
});

app.get('/about',(req,res)=>{
    res.send('This is the about page');
    }
);


app.listen(5000);
