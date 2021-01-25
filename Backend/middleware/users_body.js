function users_body (req, res, next){
    if (req.body.firstname && req.body.lastname && req.body.email && req.body.admin && req.body.password){
        next();
    } else {
        res.status(400).json("Malformed body request");
    }
}
module.exports = users_body;
   