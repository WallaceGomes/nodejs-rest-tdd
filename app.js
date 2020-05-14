const express = require('express');
const app = express();
const mongoDB = require('./mongodb/mongodb.connect');
const todoRoutes = require('./routes/todo.routes');

mongoDB.connect();

app.use(express.json());

app.use('/todos', todoRoutes);

app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message })
});

app.get('/', (req, res) => {
    res.json('Hello World!');
})

// app.listen(3000, () => {
//     console.log('Server ruinning!');
// });

module.exports = app;
