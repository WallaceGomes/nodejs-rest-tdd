//NOTA: Quando é usado supertest para testar o app.js ele já roda o server
//logo não pode haver uma chamada para a porta do server

// app.listen(3000, () => {
//     console.log('Server ruinning!');
// });

//bypass: comentar a chamada do server para não rodar duas vezes

const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock-data/new-todo.json');

const endpointUrl = ('/todos/');

describe(endpointUrl, () => {
    it('POST ' + endpointUrl, async () => {
        const response = await request(app).post(endpointUrl).send(newTodo);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
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
