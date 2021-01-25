const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const channels = require('../data/channels');


router.get('/', auth, function(req, res) {
    channels.get()
    .then( (channelsData) => {
        res.status(200).json(channelsData);
    })
    .catch(error => res.status(500).json(error));
});


module.exports = router;