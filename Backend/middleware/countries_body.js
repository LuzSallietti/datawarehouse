function countries_body (req, res, next){
    if (req.body.name && req.body.region_id){
        next();
    } else {
        res.status(400).json("Malformed body request");
    }
}
module.exports = countries_body;