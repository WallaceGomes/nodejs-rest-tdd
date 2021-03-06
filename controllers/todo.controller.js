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
        if(todo){
            res.status(200).json(todo);
        }else{
            res.status(404).send();
        }
    }catch(err){
        res.status(500).json({ message: err.message});
        next(err);
    }
}

exports.updateTodo = async (req, res, next) => {

    try{
        updatedTodo = await TodoModel.findByIdAndUpdate(req.params.todoId, req.body, {
            new: true,
            useFindAndModify: false
        })
        if(updatedTodo){
            res.status(200).json(updatedTodo);
        }else{
            res.status(404).send();
        }
    }catch(err){
        res.status(500).json({ message: err.message });
        next(err);
    }
}

exports.deleteTodo = async (req, res, next) => {
    try{
        const deletedTodo = await TodoModel.findByIdAndDelete(req.params.todoId);
        if(deletedTodo){
            res.status(200).json(deletedTodo);
        }else{
            res.status(404).send();
        }
    }catch(err){
        res.status(500).json({ message: err.message });
        next(err);
    }
}
