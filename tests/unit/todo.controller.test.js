const TodoController = require('../../controllers/todo.controller');
const TodoModel = require('../../model/todo.model');
const newTodo = require('../mock-data/new-todo.json');
const allTodos = require('../mock-data/all-todos.json');

const httpMocks = require('node-mocks-http');

//não tem como saber se uma função está sendo chamada se não usar mock
TodoModel.create = jest.fn();
TodoModel.find = jest.fn();
TodoModel.findById = jest.fn();

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn(); //para ver oque está sendo passado no next
})

describe("TodoController.getTodoById", () => {
    it("should have a getTodoById function", () => {
        expect(typeof TodoController.getTodoById).toBe("function");
    });
    it("should call TodoModel.find with route params", async () => {
        req.params.todoId = "5ebded6907c9b72f44e0f06b";
        await TodoController.getTodoById(req, res, next);
        expect(TodoModel.findById).toHaveBeenCalledWith("5ebded6907c9b72f44e0f06b");
    });
});

describe("TodoController.getTodos", () => {
    it("should have a getTodos function", () => {
        expect(typeof TodoController.getTodos).toBe("function");
    });
    it("should call TodoModel.find()", async () => {
        await TodoController.getTodos(req, res, next);
        expect(TodoModel.find).toHaveBeenCalledWith({});
    });
    it("should return 200 response code and all todos", async () => {
        TodoModel.find.mockReturnValue(allTodos);
        await TodoController.getTodos(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allTodos);
    });
    it("should handle errors", async () => {
        const errorMessage = { message: "Error finding todos" };
        const rejectionPromise = Promise.reject(errorMessage);
        TodoModel.find.mockReturnValue(rejectionPromise);
        await TodoController.getTodos(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
}); 

describe("TodoController.createTodo", () => {

    beforeEach(() => {
        req.body = newTodo;
    });

    it("should have a createTodo function", () => {
        expect(typeof TodoController.createTodo).toBe("function");
    });
    it("should call TodoModel.create", () => {
        TodoController.createTodo(req, res, next);
        expect(TodoModel.create).toBeCalledWith(newTodo);
    });
    it("should return 201 response code", async () => {
        await TodoController.createTodo(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it("should return json body in response", async () => {
        TodoModel.create.mockReturnValue(newTodo);
        await TodoController.createTodo(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });
    it("should handle errors", async () => {
        const errorMessage = { message: "Done property missing" };
        const rejectionPromise = Promise.reject(errorMessage);
        TodoModel.create.mockReturnValue(rejectionPromise);
        await TodoController.createTodo(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});
