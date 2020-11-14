const mongoose = require('mongoose');

var User = mongoose.model('User', {
    name: {type: String},
    dob: { type: String}
});

module.exports = {User};