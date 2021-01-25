const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const check_parameters = require ('../middleware/check_parameter');
const cities_body = require ('../middleware/cities_body');

const cities = require('../data/cities');

//con middleware
router.get('/', auth, function(req, res) {
    cities.get()
    .then( (citiesData) => {
        res.status(200).json(citiesData);
    })
    .catch(error => res.status(500).json(error));
});

router.post('/', auth, cities_body, function(req, res) {
    cities.add(req)
    .then((citiesData) => {
        res.status(200).json({msg:"Succesfully added", id: citiesData[0]});
    })
    .catch(error => res.status(500).json(error));
});

router.put('/:idCiudad', auth, check_parameters, cities_body, function(req, res) {
    cities.update(req)
    .then((citiesData) => {
        if(citiesData[1] === 1){
        res.status(200).json("Succesfully updated");
        } else {
            res.status(400).json("Invalid parameter");
        }
    })
    .catch(error => res.status(500).json(error));
});

router.delete('/:idCiudad', auth, check_parameters, function(req, res) {    

    cities.remove(req)
    .then((citiesData) => {              
        res.status(200).json("Succesfully deleted");
        })
    .catch(error => res.status(500).json(error));
});

module.exports = router;