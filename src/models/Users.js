const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {type: Number, required: true},
    displayName: {type: String, required: true},
});


module.exports = mongoose.model('User', userSchema);
