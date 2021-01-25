const sequelize = require("../config/mysql");

async function get(req) {    
    const contact_id = req.params.idContacto ;
    return await sequelize.query('SELECT * FROM contact_channels WHERE contact_id = ?',
        {replacements: [contact_id], type: sequelize.QueryTypes.SELECT }
    ).then(function (channels_data) {
        return channels_data;
    }).catch(function(err){
        throw(err);
    })

}

async function add(req) {
    const channel_id = req.body.channel_id;
    const contact_id = req.body.contact_id;
    const value = req.body.value; 
    const preference = req.body.preference;
    values = [channel_id, contact_id, value, preference];  

    return await sequelize.query('INSERT INTO contact_channels (channel_id, contact_id, value, preference) VALUES (?)',
        {replacements: [values], type: sequelize.QueryTypes.INSERT }
    )
    .then(function (contactChannel) {
        return contactChannel;
    })
    .catch(function(err){
        throw(err);
    });

}

async function update(req) {
    const contact_id = req.params.idContacto;
    const channel_id = req.body.channel_id;
    const value = req.body.value; 
    const preference = req.body.preference;    

    return await sequelize.query('UPDATE contact_channels set value = ?, preference = ? WHERE contact_id = ? AND channel_id =?',
        {replacements: [value, preference, contact_id, channel_id ], type: sequelize.QueryTypes.UPDATE }
    ).then(function (contactChannel) {
        return contactChannel;
    }).catch(function(err){
        throw(err);
    })

}


async function remove(req) {
    
    const id = req.params.idCanalContacto;
    return await sequelize.query('DELETE FROM contact_channels WHERE id = ?',
        {replacements: [id], type: sequelize.QueryTypes.DELETE }
    ).then(function (contactChannel) {
        return contactChannel;
    }).catch(function(err){
        throw(err);
    })

}
module.exports.get = get;
module.exports.add = add;
module.exports.remove = remove;
module.exports.update = update;