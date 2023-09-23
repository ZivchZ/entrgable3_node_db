const request = require("supertest");
const app = require("../app")
require('../models')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')

let id;

test('GET /movies deberá traer todas la películas', async () => {
    const res = await request(app).get('/movies')
    expect(res.status).toBe(200)
});

test('POST /movies deberá registrar una película', async () => {

    const movie = {
        name: "Soy Leyenda",
        image: "https://i.ytimg.com/vi/WbP4ppv_1G8/maxresdefault.jpg",
        synopsis: "Estados Unidos",
        releaseYear: 2001
    }

    const res =  await request(app).post('/movies').send(movie)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
    expect(res.body.name).toBe(movie.name)
});

test('PUT /movies debe actualizar una película', async () => {
    const movieUpdated =  {
        name: "I am legend"
    }
    const res = await request(app).put(`/movies/${id}`).send(movieUpdated)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(movieUpdated.name)
});

test('POST /movies/:id/actors deberá insertar los actores de una película', async () => {
    const actor = await Actor.create({
        firstName: "Lil",
        lastName: 'Xan',
        nationality: "Estadounidense",
        image: "http//:lilxan.jpg",
        birthday: '1990-07-12'
    });
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id])
    console.log(res.body)
    await actor.destroy();
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
});
test('POST /movies/:id/directors deberá insertar los directores de una película', async () => {

    const director = await Director.create({
        firstName: "Lil",
        lastName: 'Nas',
        nationality: "Estadounidense",
        image: "http//:lilnas.jpg",
        birthday: '1980-07-12'
    });

    const res = await request(app).post(`/movies/${id}/directors`).send([director.id])
    await director.destroy();
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
});
test('POST /movies/:id/genres deberá insertar los géneros de una película', async () => {

    const genre = await Genre.create({ name: "Paranormal" });

    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id])
    console.log(res.body)
    await genre.destroy();
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
});

test('DELETE /movies/:id debe eliminar una película', async () => {
    const res = await request(app).delete(`/movies/${id}`)
    expect(res.status).toBe(204)
});