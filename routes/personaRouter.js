const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Persona = require('../models/persona');
const personaRouter = express.Router();
personaRouter.use(bodyParser.json());

personaRouter.route('/')
.get((req,res,next) => {
  console.log("Get Persona");
    Persona.find({})
    .then((personas) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(personas);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    console.log("Post Persona");
    Persona.create(req.body)
    .then((persona) => {
        console.log('Persona Created ', persona);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(persona);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /personas');
})
.delete((req, res, next) => {
    console.log("Delete Persona");
    Persona.deleteMany({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = personaRouter;
