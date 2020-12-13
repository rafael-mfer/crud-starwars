let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

var planetController = require('../controller/planetController');

router.route('/planets')
    .get(planetController.index)
    .post(planetController.new);
router.route('/planets/id/:planet_id')
    .get(planetController.view)
    .put(planetController.update)
    .delete(planetController.delete);
router.route('/planets/name/:planet_name')
    .get(planetController.viewByName);

module.exports = router;