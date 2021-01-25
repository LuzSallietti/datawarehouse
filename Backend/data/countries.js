const { response } = require("express");
const sequelize = require("../config/mysql");

async function get() {

    return await sequelize.query('SELECT * FROM countries ORDER BY region_id',
        {type: sequelize.QueryTypes.SELECT }
    ).then(function (countries) {
        return countries
    }).catch(function(err){
        throw(err);
    })

}

async function add(req) {
    const name = req.body.name; 
    const region_id = req.body.region_id;
    values = [name, region_id];  

    return await sequelize.query('INSERT INTO countries (name, region_id) VALUES (?)',
        {replacements: [values], type: sequelize.QueryTypes.INSERT }
    )
    .then(function (country) {
        return country;
    })
    .catch(function(err){
        throw(err);
    });

}

async function update(req) {
    const id = req.params.idPais;
    const name = req.body.name;
    const region_id = req.body.region_id;    

    return await sequelize.query('UPDATE countries set name = ?, region_id = ? WHERE id = ?',
        {replacements: [name, region_id, id ], type: sequelize.QueryTypes.UPDATE }
    ).then(function (users) {
        return users;
    }).catch(function(err){
        throw(err);
    })

}


async function remove(req) {
    const id = req.params.idPais;
    return await sequelize.query('DELETE FROM countries WHERE id = ?',
        {replacements: [id], type: sequelize.QueryTypes.DELETE }
    ).then(function (user) {
        return user;
    }).catch(function(err){
        throw(err);
    })

}
module.exports.get = get;
module.exports.add = add;
module.exports.remove = remove;
module.exports.update = update;