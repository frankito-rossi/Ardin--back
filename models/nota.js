const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notaSchema = new Schema({
    fecha: {
        type: String,
        required: true
    },
    nota: {
        type: String,
        required: true
    },
    persona: {
      type: Schema.Types.ObjectId,
      ref: 'Persona'
    }
  },{
    timestamps: true
});

var Nota = mongoose.model('Nota', notaSchema);

module.exports = Nota;
