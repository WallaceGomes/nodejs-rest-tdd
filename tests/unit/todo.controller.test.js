const TodoController = require('../../controllers/todo.controller');

const TodoModel = require('../../model/todo.model');

TodoModel.create = jest.fn(); //não tem como saber se uma função está sendo chamada se não usar mock

describe("Todo Controller.createTodo", () => {
    it("should have a createTodo function", () => {
        expect(typeof TodoController.createTodo).toBe("function");
    });
    it("should call TodoModel.create", () => {
        TodoController.createTodo();
        expect(TodoModel.create).toBeCalled();
    });
});
