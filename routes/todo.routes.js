const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todo.controller');

router.post('/', todoController.createTodo);
router.get('/:todoId', todoController.getTodoById);
router.get('/', todoController.getTodos);

module.exports = router;
