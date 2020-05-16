const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todo.controller');

router.post('/', todoController.createTodo);
router.get('/:todoId', todoController.getTodoById);
router.get('/', todoController.getTodos);
router.put('/:todoId', todoController.updateTodo);

module.exports = router;
