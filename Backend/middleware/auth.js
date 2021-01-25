const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    let authorization = (req.get('Authorization')).split(" ");
    let token = authorization[1];
    jwt.verify(token, process.env.jtw_SEED,(error, decoded) => {
        if (error){
            res.status(401).json(error);
        }
        req.id = decoded.id;
        console.log(req.id);
        req.user = decoded.user;
        console.log(req.user);
        req.admin = decoded.admin;
        console.log(req.admin);
        next();
    })
}

module.exports = auth;
