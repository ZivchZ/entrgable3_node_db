const request = require('supertest')
const app = require('../app')

let id;

test('GET /directors deberá traer todos los directores', async () => {
    const res = await request(app).get('/directors')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
});

test('POST /directors deberá registrar un director', async () => {
    const director = {
        firstName: "Hanz",
        lastName: "Valak",
        nationality: "Estadounidense",
        image: "http://karlvalak.jpg",
        birthday: "1989-09-25"
    }

    const res = await request(app).post('/directors').send(director)
    id = res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
});

test('PUT /directors/:id deberá actualizar los datos de un director', async () => {
    const directorUpdate = {
        firstName: "Karl"
    }

    const res = await request(app).put(`/directors/${id}`).send(directorUpdate)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(directorUpdate.firstName)
})

test('DELETE /directors/:id deberá eliminar un director', async () => {
    const res = await request(app).delete(`/directors/${id}`)
    expect(res.status).toBe(204)
});

