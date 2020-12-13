const swapi = require('swapi-node');
const Planet = require('../model/planetModel');

async function addPlanet(req, res) {
    var planet = new Planet(req.body);
    planet.filmsAppearances = await checkMovieAppearances(planet.name);
    try {
        await planet.save();
        return planet;
    } catch (err) {
        throw err;
    };
};

async function checkMovieAppearances(name) {
    var getPlanet = await swapi.getPlanets('?search=' + name);
    if (getPlanet.results.length == 1)
        return getPlanet.results[0].films.length;
    return 0;
};

module.exports = {
    addPlanet,
    checkMovieAppearances
};