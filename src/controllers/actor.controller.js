const catchError = require('../utils/catchError');
const Actor = require('../models/Actor');

const getAll = catchError(async(req, res) => {
    const actors = await Actor.findAll();
    return res.json(actors);
});

const create = catchError(async(req, res) => {
    const actor = await Actor.create(req.body);
    return res.status(201).json(actor);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const actor = await Actor.findByPk(id);
    if(!actor) return res.sendStatus(404);
    return res.json(actor);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Actor.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const actorModified = await Actor.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(actorModified[0] === 0) return res.sendStatus(404);
    return res.json(actorModified[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}