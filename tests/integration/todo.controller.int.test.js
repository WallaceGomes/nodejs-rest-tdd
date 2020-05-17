//NOTA: Quando é usado supertest para testar o app.js ele já roda o server
//logo não pode haver uma chamada para a porta do server

// app.listen(3000, () => {
//     console.log('Server ruinning!');
// });

//bypass: comentar a chamada do server para não rodar duas vezes

const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock-data/new-todo.json');
const allTodos = require('../mock-data/all-todos.json');

const endpointUrl = ('/todos/');

let fristTodo;
let newTodoId;

const testData = { title: "Integration test for PUT", done: true };

describe(endpointUrl, () => {
    it('POST ' + endpointUrl, async () => {
        const response = await request(app).post(endpointUrl).send(newTodo);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
        newTodoId = response.body._id;
    });
    it("should return error 500 on error format with POST", async () => {
        //missing: done property
        const response = await request(app).post(endpointUrl).send({ title: "Make first unit test" });
        expect(response.statusCode).toBe(500);
        expect(response.body).toStrictEqual({
            message:
            "Todo validation failed: done: Path `done` is required."
        });
    });
});

describe(endpointUrl, () => {
    it('GET' + endpointUrl, async () => {
        const response = await request(app).get(endpointUrl);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].done).toBeDefined();
        fristTodo = response.body[0];
    });
});

describe(endpointUrl, () => {
    it("Get by ID" + endpointUrl + ":todoId", async () => {
        const response = await request(app).get(endpointUrl + fristTodo._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(fristTodo.title);
        expect(response.body.done).toBe(fristTodo.done);
    });
    it("Get by ID when id does" + endpointUrl + ":todoId", async () => {
        const response = await request(app).get(endpointUrl + "5ebded6907c9b70000000000");
        expect(response.statusCode).toBe(404);
    });
});

describe(endpointUrl, () => {
    it("PUT by Id and Update" + endpointUrl + ":todoId", async () =>{
        const response = await request(app).put(endpointUrl + newTodoId).send(testData);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(testData.title);
        expect(response.body.done).toBe(testData.done);
    });
});

describe(endpointUrl, () => {
    it("DELETE" + endpointUrl + ":todoId", async () =>{
        const response = await request(app).delete(endpointUrl + newTodoId).send();
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(testData.title);
        expect(response.body.done).toBe(testData.done);
    });
});

