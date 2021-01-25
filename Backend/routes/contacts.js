const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const check_parameters = require ('../middleware/check_parameter');
const contacts_body = require('../middleware/contacts_body');

const contacts = require('../data/contacts');


//con middleware
router.get('/', auth, function(req, res) {
    contacts.get()
    .then( (contactsData) => {
        res.status(200).json(contactsData);
    })
    .catch(error => res.status(500).json(error));
});

router.post('/', auth, contacts_body, function(req, res) {
    contacts.add(req)
    .then((contactData) => {
        res.status(200).json({msg:"Succesfully added", id: contactData[0]});
    })
    .catch(error => res.status(500).json(error));
});

router.put('/:idContacto', auth, check_parameters,contacts_body, function(req, res) {
    contacts.update(req)
    .then((contactData) => {
        if(contactData[1] === 1 || contactData[1] === 0){
        res.status(200).json("Succesfully updated");
        } else {
            res.status(400).json("Invalid parameter");
        }
    })
    .catch(error => res.status(500).json(error));
})

router.delete('/:idContacto', auth, check_parameters, function(req, res) {    

    contacts.remove(req)
    .then(response => {
        res.status(200).json("Succesfully deleted")
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;