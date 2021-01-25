const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const check_parameters = require ('../middleware/check_parameter');
const companies_body = require('../middleware/companies_body');

const companies = require('../data/companies');


router.get('/', auth, function(req, res) {
    companies.get()
    .then( (companiesData) => {
        res.status(200).json(companiesData);
    })
    .catch(error => res.status(500).json(error));
});

router.post('/', auth, companies_body, function(req, res) {
    companies.add(req)
    .then((companiesData) => {
        res.status(200).json({msg:"Succesfully added", id: companiesData[0]});
    })
    .catch(error => res.status(500).json(error));
});

router.put('/:idCompania', auth, check_parameters, companies_body, function(req, res) {
    companies.update(req)
    .then((companiesData) => {
        if(companiesData[1] === 1){
        res.status(200).json("Succesfully updated");
        } else {
            res.status(400).json("Invalid parameter");
        }
    })
    .catch(error => res.status(500).json(error));
});

router.delete('/:idCompania', auth, check_parameters, function(req, res) {    

    companies.remove(req)
    .then((companiesData) => {     
                 
        res.status(200).json("Succesfully deleted");
                     
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;