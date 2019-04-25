const express = require('express');
const router = express.Router();
const path = require('path');


router.use( express.static(__dirname + '/public' ));

router.get('/', (req,res)=> {
  res.sendFile(path.join(__dirname, '../public/login','index.html'))
})

module.exports = router;