const TodoModel = require('../model/todo.model');

exports.createTodo = async (req, res, next) => {

    let createdModel;
    try{
        createdModel = await TodoModel.create(req.body);
    }catch(err){
        //const errorMessage = { message: "Done property missing" };
        next(err);
    }
    res.status(201).json(createdModel);
};
