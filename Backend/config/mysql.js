const Sequelize = require('sequelize');

const sequelize = new Sequelize (process.env.mysql_db, process.env.mysql_user, process.env.mysql_pass, {
	host: process.env.mysql_host,
    dialect: 'mysql',
    port: process.env.mysql_port,
    dialectOptions: {
        multipleStatements: true
    }

  });


sequelize.authenticate().then(() => {
    console.log('Conectado.');
}).catch(err => {
    console.error('Error de conexion:', err);
})

module.exports = sequelize;

