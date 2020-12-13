
const Planet = require('../model/planetModel');
const { addPlanet, checkMovieAppearances } = require('../service/planetService');

exports.index = function (req, res) {
    Planet.get(function (err, planets) {
        if (err)
            return res.status(400).json({ status: 400, message: err.message });
        res.status(200).json({ status: 200, message: 'Planets retrieved successfully', data: planets });
    });
};

exports.new = async function (req, res) {
    try {
        var planet = await addPlanet(req);
        res.status(201).json({ status: 201, message: 'The force is strong in you, a new Planet was created', data: planet });
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};

exports.view = function (req, res) {
    Planet.findById(req.params.planet_id, function (err, planet) {
        if (err)
            return res.status(400).json({ status: 400, message: err.message });
        if (planet == null)
            return res.status(200).json({ status: 404, message: 'It is a trap! Planet doesnt exists' });
        res.status(200).json({ status: 200, message: 'Loading Planet details...', data: planet });
    });
};

exports.update = function (req, res) {
    Planet.findById(req.params.planet_id, function (err, planet) {
        if (err)
            return res.status(400).json({ status: 400, message: err.message });
        if (planet == null)
            return res.status(200).json({ status: 404, message: 'It is a trap! Planet doesnt exists' });
        planet.name = req.body.name ? req.body.name : planet.name;
        planet.weather = req.body.weather;
        planet.terrain = req.body.terrain;
        planet.filmsAppearances = req.body.filmsAppearances;
        // save the contact and check for errors
        planet.save(function (err) {
            if (err)
                res.status(400).json({ status: 400, message: err.message });
            res.status(200).json({ status: 200, message: 'Planet details updated', data: planet });
        });
    });
};

exports.delete = function (req, res) {
    Planet.deleteOne({
        _id: req.params.planet_id
    }, function (err) {
        if (err)
            res.status(400).json({ status: 400, message: err.message });
        res.status(200).json({ status: 200, message: 'You are like a Death Star, the Planet was deleted' });
    });
};

exports.viewByName = function (req, res) {
    Planet.find({ name: req.params.planet_name }, function (err, planet) {
        if (err)
            return res.status(400).json({ status: 400, message: err.message });
        if (planet.length == 0)
            return res.status(200).json({ status: 404, message: 'It is a trap! Planet doesnt exists' });
        res.status(200).json({ status: 200, message: 'Loading Planet details...', data: planet });
    });
};

exports.teste = async function (req, res) {
    var int = await checkMovieAppearances('Tatooine');
    console.log(int);
};