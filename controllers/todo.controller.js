const TodoModel = require('../model/todo.model');

exports.createTodo = async (req, res, next) => {

    let createdModel;
    try{
        createdModel = await TodoModel.create(req.body);
        res.status(201).json(createdModel);
    }catch(err){
        //const errorMessage = { message: "Done property missing" };
        res.status(500).json({ message: err.message });
        next(err);
    }
};

exports.getTodos = async (req, res, next) => {
    
    let todos;
    try{
        todos = await TodoModel.find({});
        res.status(200).json(todos);
    }catch(err){
        res.status(500).json({ message: err.message })
        next(err);
    }

    // const todos = await TodoModel.find({});
    // res.status(200).json(todos);
};

exports.getTodoById = async (req, res, next) => {
    const todoId = req.params.todoId;
    try{
        todo = await TodoModel.findById(todoId);
        res.status(200).json(todo);
    }catch{
        res.status(500).json({ message: err.message});
        next(err);
    }
}