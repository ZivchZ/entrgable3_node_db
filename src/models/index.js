const Genre = require('./Genre');
const Actor = require('./Actor');
const Director = require('./Director');
const Movie = require('./Movie');

    //? Sección de Géneros
Genre.belongsToMany(Actor, {through: "GenreActor"});
Actor.belongsToMany(Genre, {through: "GenreActor"});

Genre.belongsToMany(Director, {through: "GenreDirector"});
Director.belongsToMany(Genre, {through: "GenreDirector"});

Genre.belongsToMany(Movie, {through: "GenreMovie"});
Movie.belongsToMany(Genre, {through: "GenreMovie"});

    //? Sección de Actores
Actor.belongsToMany(Director, {through: "ActorDirector"});
Director.belongsToMany(Actor, {through: "ActorDirector"});

Actor.belongsToMany(Movie, {through: "ActorMovie"});
Movie.belongsToMany(Actor, {through: "ActorMovie"});

    //? Sección de Directores
Director.belongsToMany(Movie, {through: "DirectorMovie"});
Movie.belongsToMany(Director, {through: "DirectorMovie"});



