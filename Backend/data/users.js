const { response } = require("express");
const sequelize = require("../config/mysql");

async function get() {

    return await sequelize.query('SELECT id, firstname, lastname, email, admin FROM users',
        {type: sequelize.QueryTypes.SELECT }
    ).then(function (users) {
        return users
    }).catch(function(err){
        throw(err);
    })

}

async function add(req) {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const admin = req.body.admin;
    const password = req.body.password;
    const values = [firstname, lastname, email, admin, password];

    return await sequelize.query('INSERT INTO users (firstname, lastname, email, admin, password) VALUES (?)',
        {replacements: [values], type: sequelize.QueryTypes.INSERT }
    )
    .then(function (user) {
        return user;
    })
    .catch(function(err){
        throw(err);
    });

}

async function update(req) {
    const id = req.params.idUsuario;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const admin = req.body.admin;
    const password = req.body.password;

    return await sequelize.query('UPDATE users set firstname = ?, lastname = ?, email = ?, admin = ?, password = ?  WHERE id = ?',
        {replacements: [firstname, lastname, email, admin, password, id ], type: sequelize.QueryTypes.UPDATE }
    ).then(function (users) {
        return users;
    }).catch(function(err){
        throw(err);
    })

}


async function remove(req) {
    const id = req.params.idUsuario;
    return await sequelize.query('DELETE FROM users WHERE id = ?',
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