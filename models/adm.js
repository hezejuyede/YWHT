const mongoose = require('mongoose');
const db = require('./db.js');
const amdSchema = new mongoose.Schema({

    "amdid"                                       :Number,
    "amdname"                                     :String,
    "value"                                       :String,
    "title"                                       :String,
    "auther"                                      :String,
    "time"                                        :String,
    "details"                                     :String







});

amdSchema.index({"aid":1});

const amdModel = db.model('Amd',amdSchema);

module.exports= amdModel;
