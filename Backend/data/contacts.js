const sequelize = require("../config/mysql");

async function get() {

    return await sequelize.query('SELECT contacts.id, contacts.firstname, contacts.lastname, contacts.email, contacts.job_title, contacts.interesting, contacts.address, companies.name AS company_name, companies.id AS company_id, cities.id AS city_id, cities.name AS city_name, countries.id AS country_id, countries.name AS country_name, regions.id AS region_id, regions.name AS region_name FROM contacts INNER JOIN companies ON contacts.company_id = companies.id INNER JOIN cities ON contacts.city_id = cities.id INNER JOIN countries ON cities.country_id = countries.id INNER JOIN regions ON countries.region_id = regions.id',
        {type: sequelize.QueryTypes.SELECT }
    ).then(function (contacts) {        
        return contacts
    }).catch(function(err){
        
        throw(err);
    })

}

async function add(req) {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const company = req.body.company_id;
    const city = req.body.city_id;
    const job_title = req.body.job_title;
    const interesting = req.body.interesting;
    const address = req.body.address;
    const values = [firstname, lastname, email, company, city, job_title, interesting, address];

    return await sequelize.query('INSERT INTO contacts (firstname, lastname, email, company_id, city_id, job_title, interesting, address) VALUES (?)',
        {replacements: [values], type: sequelize.QueryTypes.INSERT }
    )
    .then(function (contact) {
        return contact;
    })
    .catch(function(err){
        throw(err);
    });

}

async function update(req) {
    const id = req.params.idContacto;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const company = req.body.company_id;
    const city = req.body.city_id;
    const job_title = req.body.job_title;
    const interesting = req.body.interesting;
    const address = req.body.address;    

    return await sequelize.query('UPDATE contacts set firstname = ?, lastname = ?, email = ?, company_id = ?, city_id = ?, job_title = ?, interesting = ?, address = ?  WHERE id = ?',
        {replacements: [firstname, lastname, email, company, city, job_title, interesting, address, id ], type: sequelize.QueryTypes.UPDATE }
    ).then(function (contact) {
        return contact;
    }).catch(function(err){
        return err;
    })

}


async function remove(req) {
    const id = req.params.idContacto;
    return await sequelize.query('DELETE FROM contacts WHERE id = ?',
        {replacements: [id], type: sequelize.QueryTypes.DELETE }
    ).then(function (contact) {
        return contact;
    }).catch(function(err){
        throw(err);
    })

}

module.exports.get = get;
module.exports.add = add;
module.exports.remove = remove;
module.exports.update = update;