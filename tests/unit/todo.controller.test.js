const TodoController = require('../../controllers/todo.controller');
const TodoModel = require('../../model/todo.model');
const newTodo = require('../mock-data/new-todo.json');

const httpMocks = require('node-mocks-http');

TodoModel.create = jest.fn(); //não tem como saber se uma função está sendo chamada se não usar mock

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn(); //para ver oque está sendo passado no next
})

describe("Todo Controller.createTodo", () => {

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
