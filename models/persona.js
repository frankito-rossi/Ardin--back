const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const personaSchema = new Schema({
    ci: {
        type: Number,
        required: true,
        unique: true
    },
    apellidos: {
        type: String,
        required: true
    },
    nombres: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    localidad: {
        type: String,
        required: true
    },
    telefono:{
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: String,
        required: true
    },
    bienes: {
      type: Boolean,
      required: true
    },
    notas: [{
      type: Schema.Types.ObjectId,
      ref: 'Nota'
    }],
    vales: [{
      type: Schema.Types.ObjectId,
      ref: 'Vale'
    }]
},{
    timestamps: true
});

personaSchema.plugin(uniqueValidator);

var Persona = mongoose.model('Persona', personaSchema);

module.exports = Persona;
