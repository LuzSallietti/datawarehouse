const { response } = require("express");
const sequelize = require("../config/mysql");

async function get() {

    return await sequelize.query('SELECT * FROM companies',
        {type: sequelize.QueryTypes.SELECT }
    ).then(function (company) {
        return company
    }).catch(function(err){
        throw(err);
    })
}

async function add(req) {
    const name = req.body.name; 
    const address = req.body.address;
    const email = req.body.email;
    const phone = req.body.phone;
    const city_id = req.body.city_id;
    values = [name, address, email, phone, city_id];  

    return await sequelize.query('INSERT INTO companies (name, address, email, phone, city_id) VALUES (?)',
        {replacements: [values], type: sequelize.QueryTypes.INSERT }
    )
    .then(function (company) {
        return company;
    })
    .catch(function(err){
        throw(err);
    });
}

async function update(req) {
    const id = req.params.idCompania;
    const name = req.body.name;
    const address = req.body.address;
    const email = req.body.email;
    const phone = req.body.phone;
    const city_id = req.body.city_id;      

    return await sequelize.query('UPDATE companies set name = ?, address = ?, email = ?, phone = ?, city_id = ? WHERE id = ?',
        {replacements: [name, address, email, phone, city_id, id ], type: sequelize.QueryTypes.UPDATE }
    ).then(function (company) {
        return company;
    }).catch(function(err){
        throw(err);
    })
}

async function remove(req) {
    const id = req.params.idCompania;
    return await sequelize.query('DELETE FROM companies WHERE id = ?',
        {replacements: [id], type: sequelize.QueryTypes.DELETE }
    ).then(function (company) {
        return company;
    }).catch(function(err){
        throw(err);
    })
}
module.exports.get = get;
module.exports.add = add;
module.exports.remove = remove;
module.exports.update = update;