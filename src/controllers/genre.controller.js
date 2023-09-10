const catchError = require('../utils/catchError');
const Genre = require('../models/Genre');

const getAll = catchError(async(req, res) => {
    const genres = await Genre.findAll();
    return res.json(genres);
});

const create = catchError(async(req, res) => {
    const genre = await Genre.create(req.body);
    return res.status(201).json(genre);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const genre = await Genre.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(genre);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Genre.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const genreModified = await Genre.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(genreModified[0] === 0) return res.sendStatus(404);
    return res.json(genreModified[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}