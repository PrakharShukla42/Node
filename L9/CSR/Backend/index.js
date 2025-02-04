const express = require('express');

const cors = require('cors');
const app = express();
app.use(cors());

const todos = ['gaming', 'coding', 'cricket','football']

app.get('/todos', (req, res) => {
    res.json(todos);
});

let x = [
    {name : 'GLA',
    location : 'Mathura',
    Domian : 'glauniversity.in:8085'
    }
]
app.get('/university', (req, res) => {
    res.json(x);
});

app.post('/university', (req, res) => {
    x.push(req.body);
    res.json(x);
});

app.listen(5000, () => {
    console.log('Server running at port 5000');
});