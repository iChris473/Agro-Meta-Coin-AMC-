
const mongoose = require('mongoose');

const AdminPresaleSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 0
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
    adminPaymentId: {
        type: String,
        required: true,
        unique: true
    },
    
    hash: String,

    date: String
    
}, {timestamps: true})


module.exports = mongoose.model("adminpresale", AdminPresaleSchema)