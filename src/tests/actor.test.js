const request = require('supertest')
const app = require('../app')

let id;

test('GET /actors deberá traer todos los actores', async () => {
    const res = await request(app).get('/actors')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
});

test('POST /actors deberá registrar un actor', async () => {
    const actor = {
        firstName: "Jennifer",
        lastName: "Lawrence",
        nationality: "Estadounidense",
        image: "http://jenniferlawrence.jpg",
        birthday: "1989-09-25"
    }

    const res = await request(app).post('/actors').send(actor)
    id = res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
});

test('PUT /actors/:id deberá actualizar los datos de un actor', async () => {
    const actorUpdate = {
        firstName: "Jenniffer"
    }

    const res = await request(app).put(`/actors/${id}`).send(actorUpdate)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(actorUpdate.firstName)
})

test('DELETE /actors/:id deberá eliminar un actor', async () => {
    const res = await request(app).delete(`/actors/${id}`)
    expect(res.status).toBe(204)
});

