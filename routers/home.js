const express = require('express');
const router = express.Router();
const auth = require('../auth');
const mongoose = require('mongoose');

router.get('/', (req,res) => {
    res.write('Username: ' + auth.username);
    res.write('\nUserid: '+ auth.userid);
    res.end();
})



module.exports = router;