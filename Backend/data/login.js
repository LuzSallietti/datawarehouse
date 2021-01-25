const sequelize = require("../config/mysql");
const jwt = require('jsonwebtoken');
const dotenv = require(`dotenv`);
dotenv.config();


async function post(req) {
    const user = req.body.user; 
    const password = req.body.password;
   

    return await sequelize.query(`SELECT * FROM users WHERE email = '${user}' AND password = '${password}'`,
        {type: sequelize.QueryTypes.SELECT }
    )
    .then(function (user_query) {
        if (user_query.length === 1){
            console.log(user_query);
            let token_data = {           
            token:jwt.sign({ id: user_query[0].id, user: user_query[0].email, admin: user_query[0].admin }, `${process.env.jtw_SEED}`, { expiresIn: '24h' }),
            role: user_query[0].admin};
            
            return token_data;
        }        
        
    })
    .catch(function(err){
        throw(err);
    });

}

module.exports.post = post;

