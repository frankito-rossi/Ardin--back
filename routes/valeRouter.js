const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Vale = require('../models/vale');
const Persona = require('../models/persona')
const valeRouter = express.Router();
valeRouter.use(bodyParser.json());

valeRouter.route('/')
.get((req,res,next) => {
  console.log("Get Vales");
    Vale.find({})
    .then((vales) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(vales);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    console.log("Post Vale");
    Persona.findById(req.body.persona)
    .then((persona) => {
        if(persona != null) {
            Vale.create(req.body)
            .then(vale => {
              persona.vales.push(vale._id);
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
    res.end('PUT operation not supported on /vales');
})
.delete((req, res, next) => {
    console.log("Delete Vale");
    Vale.deleteMany({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

valeRouter.route('/:valeId')
.put((req, res, next) => {
  console.log(req.body);
    Vale.findById(req.params.valeId)
    .then((vale) => {
      for(let i = 0; i < vale.pagos.length; i++){
        if(vale.pagos[i]._id == req.body._id){
          vale.pagos[i].entrega = req.body.entrega;
          vale.pagos[i].nota = req.body.nota;
          vale.pagos[i].fechaPago = req.body.fechaPago;
          vale.pagos[i].pago = req.body.pago;
        }
      }
      vale.save().then((vale) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(vale);
      }, (err) => next(err)).catch((err) => next(err));
    }, (err) => next(err))
    .catch((err) => next(err));
})


module.exports = valeRouter;
