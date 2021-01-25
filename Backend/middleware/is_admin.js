const is_admin = (req, res, next) => {
    if (req.admin === 1){
        next();
    } else {
        res.status(401).json("Unauthorized action");
    }
    
};

module.exports = is_admin;