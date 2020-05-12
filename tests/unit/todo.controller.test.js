const TodoController = require('../../controllers/todo.controller');

describe("Todo Controller.createTodo", () => {
    it("should have a createTodo function", () => {
        expect(typeof TodoController.createTodo).toBe("function");
    });
});
