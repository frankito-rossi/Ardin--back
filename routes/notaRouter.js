const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Nota = require('../models/nota');
const Persona = require('../models/persona');

const notaRouter = express.Router();
notaRouter.use(bodyParser.json());

notaRouter.route('/')
.get((req,res,next) => {
  console.log("Get Notas");
    Nota.find({})
    .then((notas) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(notas);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    console.log("Post Nota");
    Persona.findById(req.body.persona)
    .then((persona) => {
        if(persona != null){
            Nota.create(req.body)
            .then(nota => {
              persona.notas.push(nota._id);
              persona.save()
              .then((persona) => {
                  Persona.findById(persona._id)
                  .then((persona) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(persona);
                  })
              }, (err) => next(err));
            });
        }
          else {
              err = new Error('Persona not found');
              err.status = 404;
              return next(err);
          }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /notas');
})
.delete((req, res, next) => {
    console.log("Delete Nota");
    Nota.deleteMany({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

notaRouter.route('/:notaId')
.delete((req, res, next) => {
    Nota.findById(req.params.notaId)
    .then((nota) => {
      if(nota != null){
        Persona.findById(nota.persona)
        .then((persona) => {
          var index = persona.notas.map(x => {return x._id}).indexOf(req.params.notaId)
          persona.notas.splice(index, 1);
          persona.save();
          nota.remove()
          .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
          }, (err) => next(err));
        });
      }
      else {
          err = new Error('Persona not found');
          err.status = 404;
          return next(err);
      }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = notaRouter;
