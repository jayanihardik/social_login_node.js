var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
    profile: {
        type: String,
    }
});

module.exports = mongoose.model('user', UserSchema);

