function regions_body (req, res, next){
    if (req.body.name){
        next();
    } else {
        res.status(400).json("Malformed body request");
    }
}
module.exports = regions_body;