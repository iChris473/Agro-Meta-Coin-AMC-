
const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({

    sender: {
        type: String,
        required: true
    },
    receiever: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    wallet: {
        type: String,
        required: true
    }

}, {timestamps: true})


module.exports = mongoose.model("History", HistorySchema)