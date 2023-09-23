const request = require('supertest')
const app = require('../app')

let id;

test('GET /genres deberá traer todos los géneros', async () => {
    const res = await request(app).get('/genres')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
});

test('POST /genres deberá registrar un genero', async () => {
    const genre = {
        name: "Terror",
    }

    const res = await request(app).post('/genres').send(genre)
    id = res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
    expect(res.body.name).toBe(genre.name)
});

test('PUT /genres/:id deberá actualizar los datos de un genre', async () => {
    const genreUpdate = {
        name: "Horror"
    }

    const res = await request(app).put(`/genres/${id}`).send(genreUpdate)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(genreUpdate.name)
})

test('DELETE /genres/:id deberá eliminar un genre', async () => {
    const res = await request(app).delete(`/genres/${id}`)
    expect(res.status).toBe(204)
});

