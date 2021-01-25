const { response } = require("express");
const sequelize = require("../config/mysql");

async function get() {

    return await sequelize.query('SELECT * FROM channels',
        {type: sequelize.QueryTypes.SELECT }
    ).then(function (channels) {
        return channels;
    }).catch(function(err){
        throw(err);
    })

}

async function add(req) {
    const name = req.body.name;

    return await sequelize.query('INSERT INTO channels (name) VALUES (?)',
        {replacements: [name], type: sequelize.QueryTypes.INSERT }
    ).then(function (channel) {
        return channel;
    }).catch(function(err){
        throw(err);
    })

}
module.exports.get = get;
module.exports.add = add;