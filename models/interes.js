const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interesSchema = new Schema({
    tipoPlan: {
        type: String,
        required: true
    },
    interes: {
        type: Number,
        required: true
    }
  },{
    timestamps: true
});

var Interes = mongoose.model('Interes', interesSchema);

module.exports = Interes;
