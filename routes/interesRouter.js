const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Vale = require('../models/vale');
const Interes = require('../models/intereses')
const interesRouter = express.Router();
interesRouter.use(bodyParser.json());

interesRouter.route('/')
.get((req,res,next) => {
  console.log("Get Intereses");
    Interes.find({})
    .then((vales) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(vales);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    console.log("Post Interes");
    Intres.create(req.body)
    .then((interes) => {
        console.log('Interes Created ', interes);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(interes);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /intereses');
})
.delete((req, res, next) => {
    console.log("Delete Interes");
    Vale.deleteMany({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = interesRouter;
