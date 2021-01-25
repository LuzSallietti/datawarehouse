const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const contact_channels = require('../data/contact_channels');
const check_parameters = require ('../middleware/check_parameter');
const contact_channels_body = require('../middleware/contact_channels_body');

//con middleware
router.get('/:idContacto', auth, function(req, res) {
    contact_channels.get(req)
    .then( (contactChannelsData) => {
        res.status(200).json(contactChannelsData);
    })
    .catch(error => res.status(500).json(error));
});

router.post('/', auth, contact_channels_body, function(req, res) {
    contact_channels.add(req)
    .then((contactChannel) => {
        res.status(200).json({msg:"Succesfully added", id: contactChannel[0]});
    })
    .catch(error => res.status(500).json(error));
});

router.put('/:idContacto', auth, check_parameters, function(req, res) {
    contact_channels.update(req)
    .then((contactChannel) => {
        if(contactChannel[1] === 1 || contactChannel[1] === 0){
        res.status(200).json("Succesfully updated");
        } else {
            res.status(400).json("Invalid parameter");
        }
    })
    .catch(error => res.status(500).json(error));
});

router.delete('/:idCanalContacto', auth, check_parameters, function(req, res) {    

    contact_channels.remove(req)
    .then((contactChannel) => {    
        if(!contactChannel){
            res.status(405).json("Invalid parameter");
        } else {          
        res.status(200).json("Succesfully deleted");
        }              
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;

