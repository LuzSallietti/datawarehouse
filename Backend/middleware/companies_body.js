function companies_body (req, res, next){
    if (req.body.name && req.body.address && req.body.email && req.body.phone && req.body.city_id){
        next();
    } else {
        res.status(400).json("Malformed body request");
    }

}
module.exports = companies_body;