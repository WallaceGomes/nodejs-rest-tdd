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
