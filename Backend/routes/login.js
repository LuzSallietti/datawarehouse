const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const login = require('../data/login');

router.post('/', function(req, res) {
    login.post(req)
    .then((valid_user) => {
        if (valid_user){
            res.status(200).json({valid_user});
        }
        else {
            res.status(400).json("Incorrect username or password, or not registered user");
        }
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;