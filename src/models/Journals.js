const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    month: {type: String, required: true},
    userId: {type: Number, required: true},
    date: {type: String, required: true},
    entry: {type: String, required: true},
    emotion: String
});


module.exports = mongoose.model('Journal', journalSchema);
