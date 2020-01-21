const user = require("../model");


exports.googlelogin = (req, res) => {
    console.log('call');

    user.create(req.body)
        .then(results => {
            res.status(201).json({
                ResponseStatus: 0,
                message: "User is createrd"
            });
        })

};