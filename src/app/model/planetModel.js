var mongoose = require('mongoose');

var planetSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    weather: {
        type: String,
        required: true
    },
    terrain: {
        type: String,
        required: true
    },
    filmsAppearances:{
        type: Number
    }
});

const Planet = mongoose.model("Planet", planetSchema);
module.exports = Planet;
module.exports.get = function (callback, limit) {
    Planet.find(callback).limit(limit);
}