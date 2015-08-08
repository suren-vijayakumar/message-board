var mongoose = require('mongoose');

var PeopleSchema = new mongoose.Schema ({
    //key: data type
    name: String,
    message: String,
    time : { type : Date, default: Date.now }
});

module.exports = mongoose.model("people", PeopleSchema);