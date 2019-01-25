var mongoose = require('mongoose');
var schema = mongoose.Schema;

var spUser = new schema({
    _id: Number,
    username: String,
    commands: [{name: String, response: String}],
    email: String,
    partner: String
})

module.exports = spUser