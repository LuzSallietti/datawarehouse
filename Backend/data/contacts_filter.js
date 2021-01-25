const sequelize = require("../config/mysql");

async function getByFilter(req) {

    
    let body_length = (Object.values(req.query).length);    
    

    if (body_length === 1) {
        let statement = 'SELECT contacts.id, contacts.firstname, contacts.lastname, contacts.email, contacts.job_title, contacts.interesting, contacts.address, companies.name AS company_name, companies.id AS company_id, cities.id AS city_id, cities.name AS city_name, countries.id AS country_id, countries.name AS country_name, regions.id AS region_id, regions.name AS region_name FROM contacts INNER JOIN companies ON contacts.company_id = companies.id INNER JOIN cities ON contacts.city_id = cities.id INNER JOIN countries ON cities.country_id = countries.id INNER JOIN regions ON countries.region_id = regions.id WHERE';

        if (req.query.firstname) {
            const firstname = req.query.firstname;
            statement = `${statement} firstname LIKE '%${firstname}%'`;
        }
        if (req.query.lastname) {
            const lastname = req.query.lastname;
            statement = `${statement} lastname LIKE '%${lastname}%'`;
        }
        if (req.query.job_title) {
            const job_title = req.query.job_title;
            statement = `${statement} job_title LIKE '%${job_title}%'`;
        }
        if (req.query.company_id) {
            const company_id = req.query.company_id;
            statement = `${statement} company_id = '${company_id}'`;
        }
        if (req.query.city_id) {
            const city_id = req.query.city_id;
            statement = `${statement} contacts.city_id = '${city_id}'`;
        }
        if (req.query.country_id) {
            const country_id = req.query.country_id;
            statement = `${statement} countries.id = '${country_id}'`;
        }
        if (req.query.interesting) {
            const interesting = req.query.interesting;
            statement = `${statement} contacts.interesting = '${interesting}'`;
        }

        if (req.query.fav_channel) {

            const fav_channel = req.query.fav_channel;
            let fav_channel_statement = `SELECT contacts.id, contacts.firstname, contacts.lastname, contacts.email, contacts.job_title, contacts.interesting, contacts.address, companies.name AS company_name, companies.id AS company_id, cities.id AS city_id, cities.name AS city_name, countries.id AS country_id, countries.name AS country_name, regions.id AS region_id, regions.name AS region_name FROM contacts INNER JOIN companies ON contacts.company_id = companies.id INNER JOIN cities ON contacts.city_id = cities.id INNER JOIN countries ON cities.country_id = countries.id INNER JOIN regions ON countries.region_id = regions.id INNER JOIN contact_channels ON contact_channels.contact_id = contacts.id WHERE contact_channels.channel_id = ${fav_channel} AND contact_channels.preference = 'Canal favorito'`;

            statement = fav_channel_statement;

        }

        return sequelize.query(statement,
            { type: sequelize.QueryTypes.SELECT }
        ).then(function (contacts) {
            return contacts
        }).catch(function (err) {

            throw (err);
        })
    }
    //trabajar cuando hay más de un criterio de busqueda
    else if (body_length > 1) {
        let search_object = {};
        let statement = 'SELECT contacts.id, contacts.firstname, contacts.lastname, contacts.email, contacts.job_title, contacts.interesting, contacts.address, companies.name AS company_name, companies.id AS company_id, cities.id AS city_id, cities.name AS city_name, countries.id AS country_id, countries.name AS country_name, regions.id AS region_id, regions.name AS region_name FROM contacts INNER JOIN companies ON contacts.company_id = companies.id INNER JOIN cities ON contacts.city_id = cities.id INNER JOIN countries ON cities.country_id = countries.id INNER JOIN regions ON countries.region_id = regions.id WHERE';

        if (req.query.firstname) {
            search_object.firstname = req.query.firstname;
        }
        if (req.query.lastname) {
            search_object.lastname = req.query.lastname;
        }
        if (req.query.job_title) {
            search_object.job_title = req.query.job_title;
        }
        if (req.query.company_id) {
            search_object.company_id = req.query.company_id;
        }
        if (req.query.city_id) {
            search_object.city_id = req.query.city_id;
        }
        if (req.query.country_id) {
            search_object.country_id = req.query.country_id;
        }
        if (req.query.interesting) {
            search_object.interesting = req.query.interesting;
        }
        if (req.query.fav_channel) {
            search_object.fav_channel = req.query.fav_channel;
        }

        

        Object.entries(search_object).forEach(([key, value]) => {
            if (key === "city_id") {
                statement = `${statement} contacts.${key} = '${value}' AND`;
            }
            else if (key === "country_id") {
                statement = `${statement} countries.id = '${value}' AND`;
            }
            else if (key === "fav_channel") {
                let fav_channel_statement = statement.split('WHERE');
                statement = `${fav_channel_statement[0]}INNER JOIN contact_channels ON contact_channels.contact_id = contacts.id WHERE${fav_channel_statement[1]} contact_channels.channel_id = ${value} AND contact_channels.preference = 'Canal favorito' `

            }
            else {
                statement = `${statement} ${key} = '${value}' AND`
            };
        });

        statement = statement.split(' ') // separa el string según espacios en blanco
            .slice(0, -1) // toma todos los elementos menos el último
            .join(' '); // vuelve a armar el string

        console.log(statement);

        return sequelize.query(statement,
            { type: sequelize.QueryTypes.SELECT }
        ).then(function (contacts) {
            return contacts
        }).catch(function (err) {

            throw (err);
        })
    }
    
}

module.exports.getByFilter = getByFilter;