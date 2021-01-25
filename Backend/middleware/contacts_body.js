function contacts_body (req, res, next){
    if (req.body.firstname && req.body.lastname && req.body.email && req.body.company_id && req.body.city_id && req.body.job_title && req.body.interesting && req.body.address){
        next();
    } else {
        res.status(400).json("Malformed body request");
    }
}
module.exports = contacts_body;