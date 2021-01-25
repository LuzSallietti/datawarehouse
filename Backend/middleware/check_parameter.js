function check_parameters (req, res, next) {
    for (const [key, value] of Object.entries(req.params)) {
        if(value === null || value === " "){
            res.status(400).json("Parameter missing");
        }
        else {
            next();
        }
      }
}
   
module.exports = check_parameters;