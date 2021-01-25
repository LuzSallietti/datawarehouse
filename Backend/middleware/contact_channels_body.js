function contact_channels_body(req, res, next){
    if(req.body.channel_id && req.body.contact_id && req.body.value && req.body.preference){
        next();
    } else {
        res.status(400).json("Malformed body request");
    }
}
module.exports = contact_channels_body;