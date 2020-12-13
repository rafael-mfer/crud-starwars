process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
let Planet = require('../src/app/model/planetModel');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server.js');
let should = chai.should();

chai.use(chaiHttp);

describe('Planets', () => {
  beforeEach((done) => { //Empty the database before each test
    Planet.deleteMany({}, (err) => {
      done();
    });
  });

  // Test the /GET route

  describe('/GET planets', () => {
    it('it should GET all the Planets', (done) => {
      chai.request(server)
        .get('/planets')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    }).timeout(100000);
  });

  //Test the /POST route

  describe('/POST planets', () => {
    it('it should not POST a Planet without name field', (done) => {
      let planet = {
        weather: "arid",
        terrain: "desert"
      };
      chai.request(server)
        .post('/planets')
        .send(planet)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.message.should.be.eq('Planet validation failed: name: Path `name` is required.');
          done();
        });
    });

  });

  describe('/POST planets', () => {
    it('it should not POST a Planet without weather field', (done) => {
      let planet = {
        name: "Tatooine",
        terrain: "desert"
      };
      chai.request(server)
        .post('/planets')
        .send(planet)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.message.should.be.eq('Planet validation failed: weather: Path `weather` is required.');
          done();
        });
    });
  });

  describe('/POST planets', () => {
    it('it should not POST a Planet without terrain field', (done) => {
      let planet = {
        name: "Tatooine",
        weather: "arid"
      };
      chai.request(server)
        .post('/planets')
        .send(planet)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.message.should.be.eq('Planet validation failed: terrain: Path `terrain` is required.');
          done();
        });
    });
  });

  describe('/POST planets', () => {
    it('it should POST a Planet with all required fields', () => {
      let planet = {
        name: "Tatooine",
        weather: "arid",
        terrain: "desert"
      };
      chai.request(server)
        .post('/planets')
        .send(planet)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.data.name.should.be.eq(planet.name);
        });
    });
  });

  describe('/POST planets', () => {
    it('it should not POST a Planet with existing name', (done) => {
      let planet = {
        name: "Tatooine",
        weather: "arid",
        terrain: "desert"
      };
      chai.request(server)
        .post('/planets')
        .send(planet)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  //Test the /GET/planets/id/:planet_id route (find a planet by id)

  describe('/GET/planets/id/:planet_id', () => {
    it('it should GET a Planet by the given id', (done) => {
      let planet = new Planet({
        name: "Tatooine",
        weather: "arid",
        terrain: "desert"
      });
      planet.save((err, planet) => {
        chai.request(server)
          .get('/planets/id/' + planet.id)
          .send(planet)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.should.have.property('name');
            res.body.data.should.have.property('weather');
            res.body.data.should.have.property('terrain');
            res.body.data.should.have.property('_id').eql(planet.id);
            done();
          });
      });

    });
  });

  //Test the /GET/planets/name/:planet_name route (find a planet by name)

  describe('/GET/planets/name/:planet_name', () => {
    it('it should GET a Planet by the given name', (done) => {
      let planet = new Planet({
        name: "Tatooine",
        weather: "arid",
        terrain: "desert"
      });
      planet.save((err, planet) => {
        chai.request(server)
          .get('/planets/name/' + planet.name)
          .send(planet)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
      });
    });
  });

  //Test the /PUT/planets/id/:planet_id route (update)

  describe('/PUT/planets/id/:planet_id', () => {
    it('it should UPDATE a Planet given the id', (done) => {
      let planet = new Planet({
        name: "Tatooine",
        weather: "arid",
        terrain: "desert"
      });
      planet.save((err, planet) => {
        chai.request(server)
          .put('/planets/id/' + planet.id)
          .send({
            name: "Earth",
            weather: "depends",
            terrain: "depends"
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Planet details updated');
            res.body.data.should.have.property('name').eql('Earth');
            done();
          });
      });
    });
  });

  //Test the /PUT/planets/id/:planet_id route (update)

  describe('/PUT/planets/id/:planet_id', () => {
    it('it should UPDATE a Planet given the id', (done) => {
      let planet = new Planet({
        name: "Tatooine",
        weather: "arid",
        terrain: "desert"
      });
      planet.save((err, planet) => {
        chai.request(server)
          .put('/planets/id/' + planet.id)
          .send({
            name: "Earth",
            weather: "depends",
            terrain: "depends"
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Planet details updated');
            res.body.data.should.have.property('name').eql('Earth');
            res.body.data.should.have.property('weather').eql('depends');
            res.body.data.should.have.property('terrain').eql('depends');
            done();
          });
      });
    });
  });

  // Test the /DELETE/:id route

  describe('/DELETE/planets/id/:planet_id', () => {
    it('it should DELETE a Planet given the id', (done) => {
      let planet = new Planet({
        name: "Tatooine",
        weather: "arid",
        terrain: "desert"
      });
      planet.save((err, planet) => {
        chai.request(server)
          .delete('/planets/id/' + planet.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('You are like a Death Star, the Planet was deleted');
            done();
          });
      });
    });
  });

});
