const express = require("express");
const db = require("./database/dev");
const dbTest = require("./database/test");
const mongoose = require("mongoose");
const router = require("./app/routes/routes");

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'test')
    mongoose.connect(dbTest.uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(db.uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(router);

app.listen(8080, () => { console.log('The Force has awakened: server is running in port 8080') });

module.exports = app;