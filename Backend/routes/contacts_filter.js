const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const contacts_filter = require('../data/contacts_filter');

router.get('/', auth, function (req, res) {
    contacts_filter.getByFilter(req)
    .then( (contactsData) => {
        res.status(200).json(contactsData);
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;