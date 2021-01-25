function cities_body (req, res, next){
    if (req.body.name && req.body.country_id){
        next();
    } else {
        res.status(400).json("Malformed body request");
    }
}
module.exports = cities_body;