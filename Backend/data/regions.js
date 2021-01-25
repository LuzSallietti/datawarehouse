const sequelize = require("../config/mysql");

async function get() {

    return await sequelize.query('SELECT * FROM regions',
        {type: sequelize.QueryTypes.SELECT }
    ).then(function (regions) {
        return regions
    }).catch(function(err){
        throw(err);
    })

}

async function add(req) {
    const name = req.body.name;

    return await sequelize.query('INSERT INTO regions (name) VALUES (?)',
        {replacements: [name], type: sequelize.QueryTypes.INSERT }
    ).then(function (region) {
        return region;
    }).catch(function(err){
        throw(err);
    })

}

async function update(req) {
    const name = req.body.name;
    const id = req.params.idRegion;

    return await sequelize.query('UPDATE regions set name = ? WHERE id = ?',
        {replacements: [name, id], type: sequelize.QueryTypes.UPDATE }
    ).then(function (region) {
        return region;
    }).catch(function(err){
        throw(err);
    })

}


async function remove(req) {
    const id = req.params.idRegion;
    return await sequelize.query('DELETE FROM regions WHERE id = ?',
        {replacements: [id], type: sequelize.QueryTypes.DELETE }
    ).then(function (region) {
        return region;
    }).catch(function(err){
        throw(err);
    })

}

module.exports.get = get;
module.exports.add = add;
module.exports.remove = remove;
module.exports.update = update;