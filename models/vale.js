const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pagoSchema = new Schema({
    entrega: {
      type: Number
    },
    importe: {
      type: Number,
      required: true
    },
    fechaPago: {
      type: String
    },
    fechaVencimiento: {
      type: String
    },
    nota: {
      type: String
    },
    pago: {
      type: Boolean,
      default: false
    }
}, {
    timestamps: true
});

const valeSchema = new Schema({
    numeroFactura: {
        type: Number,
        required: true
    },
    numeroConforme: {
        type: Number,
        required: true
    },
    fechaEmision: {
        type: String,
        required: true
    },
    importe: {
        type: Number,
        required: true
    },
    cantidadCuotas: {
        type: Number,
        required: true
    },
    entregaInicial: {
        type: Number,
        required: true
    },
    fechaPrimerVencimiento: {
        type: String, //fechaEmision + 1mes
        required: true
    },
    detalle: {
        type: String
    },
    persona: {
      type: Schema.Types.ObjectId,
      ref:'Persona'
    },
    pagos: [pagoSchema],
    interes: {
      //type: Schema.Types.ObjectId,
      //ref:'Interes'
      type: Number,
    }
  },{
    timestamps: true
  });

var Vale = mongoose.model('Vale', valeSchema);

module.exports = Vale;
