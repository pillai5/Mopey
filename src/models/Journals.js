const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    month: {type: String, required: true},
    id: {type: String, required: true},
    date: {type: String, required: true},
    entry: {type: String, required: true},
    emotion: String
});


module.exports = mongoose.model('Journal', journalSchema);
