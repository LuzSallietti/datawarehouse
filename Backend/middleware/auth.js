const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    let authorization = (req.get('Authorization')).split(" ");
    let token = authorization[1];
    jwt.verify(token, process.env.jtw_SEED,(error, decoded) => {
        if (error){
            res.status(401).json(error);
        }
        req.id = decoded.id;        
        req.user = decoded.user;        
        req.admin = decoded.admin;        
        next();
    })
}

module.exports = auth;
