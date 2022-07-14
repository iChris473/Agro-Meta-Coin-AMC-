
const mongoose = require('mongoose');

const PresaleSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 0
    },
    ref: {
        type: String
    },
    refBsc: {
        type: String
    },
    refAmount: {
        type: String
    },
    grandRef: {
        type: String
    },
    grandRefBsc: {
        type: String
    },
    grandRefAmount: {
        type: String
    },
    bonus: {
        type: Number,
        default: 0
    },
    bsc: {
        type: String,
    },
    paid: {
        type: Boolean,
        default: false
    },
    paymentId: [{ type: String }],

    mainPaymentId: {type:String},

    hash: {
        type: String
    },
    childPayment: [
        {
          paymentId: String,
          amount: String,
          paid: {type:Boolean, default: false},
          date: {type : Date, default: new Date()}
        }
      ]
    
    
}, {timestamps: true})


module.exports = mongoose.model("Presale", PresaleSchema)