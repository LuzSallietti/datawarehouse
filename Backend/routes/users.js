const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const is_admin = require('../middleware/is_admin');
const check_parameter = require('../middleware/check_parameter');
const users_body = require('../middleware/users_body');

const users = require('../data/users');

//con middleware
router.get('/', auth, is_admin, function(req, res) {
    users.get()
    .then( (usersData) => {
        res.status(200).json(usersData);
    })
    .catch(error => res.status(500).json(error));
});

router.post('/', auth, is_admin, users_body, function(req, res) {
    users.add(req)
    .then((usersData) => {
        res.status(200).json({msg:"Succesfully added", id: usersData[0]});
    })
    .catch(error => res.status(500).json(error));
});



router.put('/:idUsuario', auth, is_admin, check_parameter, users_body, function(req, res) {
    users.update(req)
    .then((usersData) => {
        if(usersData[1] === 1){
        res.status(200).json("Succesfully updated");
        } else {
            res.status(400).json("Invalid parameter");
        }
    })
    .catch(error => res.status(500).json(error));
});

router.delete('/:idUsuario', auth, is_admin, check_parameter, function(req, res) {    

    users.remove(req)
    .then((userData) => {

            res.status(200).json("Succesfully deleted");
            console.log(userData);
        }
               
    )
    .catch(error => res.status(500).json(error));
});

module.exports = router;
