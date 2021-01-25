const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const regions = require('../data/regions');
const check_parameters = require('../middleware/check_parameter');
const regions_body = require('../middleware/regions_body');

router.get('/', auth, function(req, res) {
    regions.get()
    .then( (regionsData) => {
        res.status(200).json(regionsData);
    })
    .catch(error => res.status(500).json(error));
});

router.post('/', auth, function(req, res) {
    regions.add(req)
    .then((regionsData) => {
        res.status(200).json({msg:"Succesfully added", id: regionsData[0]});
    })
    .catch(error => res.status(500).json(error));
});

router.put('/:idRegion', auth, check_parameters, regions_body, function(req, res) {
    regions.update(req)
    .then((regionsData) => {
        if (regionsData[1] === 1){
        res.status(200).json("Succesfully updated");
        } else {
            res.status(400).json("Invalid parameter");
        }
    })
    .catch(error => res.status(500).json(error));
});

router.delete('/:idRegion', auth, check_parameters, function(req, res) {    

    regions.remove(req)
    .then((regionsData) => {       
        
        res.status(200).json("Succesfully deleted");
        console.log(regionsData);
                    
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;
