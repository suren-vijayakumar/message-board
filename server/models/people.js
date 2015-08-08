var mongoose = require('mongoose');

var PeopleSchema = new mongoose.Schema ({
    //key: data type
    name: String,
    message: String
});

module.exports = mongoose.model("people", PeopleSchema);