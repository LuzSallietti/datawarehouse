const express = require("express");
const server = express();
const cors = require('cors');
const dotenv = require(`dotenv`)
dotenv.config();
const jwt = require('jsonwebtoken');
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true }));
//db
require("./config/mysql");
//routes
var login = require('./routes/login');
server.use('/v1/login', login);
var regions = require('./routes/regions');
server.use('/v1/regiones', regions);
var users = require("./routes/users");
server.use('/v1/usuarios', users);
var countries = require('./routes/countries');
server.use('/v1/paises', countries);
var cities = require('./routes/cities');
server.use('/v1/ciudades', cities);
var companies = require('./routes/companies');
server.use('/v1/companias', companies);
var channels = require('./routes/channels');
server.use('/v1/canales', channels);
var contacts = require('./routes/contacts');
server.use('/v1/contactos', contacts);
var contact_channels = require('./routes/contact_channels');
server.use('/v1/canales/contacto', contact_channels);
var contacts_filter = require('./routes/contacts_filter');
server.use('/v1/contactos/filtrar', contacts_filter);

//definir el puerto
server.listen(process.env.PORT, () => {
    console.log (`Escuchando en puerto ${process.env.PORT}`);    
})