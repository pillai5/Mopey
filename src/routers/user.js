const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/', (req,res) => {
    res.json({response: 'a GET request for looking at all entries'});
})

router.get('/:entryID', (req,res) => {
    res.json({response: `a GET request for looking at entry with id: ${req.params.entryID}`});
})

router.post('/', (req,res) => {
    res.json({response: `a POST request for creating new entry with id: ${req.params.entryID}`,
    body: req.body
    });
})
router.put('/:entryID', (req,res) => {
    res.json({response: `a PUT request for editing entry with id: ${req.params.entryID}`,
    body: req.body
    });
})

router.delete('/:entryID', (req,res) => {
    res.json({response: `a DELETE request for deleting entry with id: ${req.params.entryID}`,
    body: req.body
    });
})

module.exports = router;