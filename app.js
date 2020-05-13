const express = require('express');
const app = express();

const todoRoutes = require('./routes/todo.routes');

app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
    res.json('Hello World!');
})

app.listen(3000, () => {
    console.log('Server ruinning!');
});

module.exports = app;
