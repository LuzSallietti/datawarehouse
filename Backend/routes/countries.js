const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const check_parameters = require ('../middleware/check_parameter');
const countries_body = require ('../middleware/countries_body');

const countries = require('../data/countries');


router.get('/', auth, function(req, res) {
    countries.get()
    .then( (countriesData) => {
        res.status(200).json(countriesData);
    })
    .catch(error => res.status(500).json(error));
});

router.post('/', auth, countries_body, function(req, res) {
    countries.add(req)
    .then((countriesData) => {
        res.status(200).json({msg:"Succesfully added", id: countriesData[0]});
    })
    .catch(error => res.status(500).json(error));
});

router.put('/:idPais', auth, check_parameters, countries_body, function(req, res) {
    countries.update(req)
    .then((countriesData) => {
        if(countriesData[1] === 1){
        res.status(200).json("Succesfully updated");
        } else {
            res.status(400).json("Invalid parameter");
        }
    })
    .catch(error => res.status(500).json(error));
});

router.delete('/:idPais', auth, check_parameters, function(req, res) {    

    countries.remove(req)
    .then((countriesData) => {               
                       
    res.status(200).json("Succesfully deleted");
                                 
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;
