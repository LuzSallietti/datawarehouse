const sequelize = require("../config/mysql");

async function get() {

    return await sequelize.query('SELECT * FROM cities ORDER BY country_id',
        {type: sequelize.QueryTypes.SELECT }
    ).then(function (cities) {
        return cities
    }).catch(function(err){
        throw(err);
    })

}

async function add(req) {
    const name = req.body.name; 
    const country_id = req.body.country_id;
    values = [name, country_id];  

    return await sequelize.query('INSERT INTO cities (name, country_id) VALUES (?)',
        {replacements: [values], type: sequelize.QueryTypes.INSERT }
    )
    .then(function (city) {
        return city;
    })
    .catch(function(err){
        throw(err);
    });

}

async function update(req) {
    const id = req.params.idCiudad;
    const name = req.body.name;
    const country_id = req.body.country_id;    

    return await sequelize.query('UPDATE cities set name = ?, country_id = ? WHERE id = ?',
        {replacements: [name, country_id, id ], type: sequelize.QueryTypes.UPDATE }
    ).then(function (cities) {
        return cities;
    }).catch(function(err){
        throw(err);
    })

}


async function remove(req) {
    const id = req.params.idCiudad;
    return await sequelize.query('DELETE FROM cities WHERE id = ?',
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