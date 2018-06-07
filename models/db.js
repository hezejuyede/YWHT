const mongoose = require('mongoose');

const db = mongoose.createConnection('mongodb://localhost:27017/YCYSX');

db.once('open', function (callback) {
    console.log("数据库成功连接");
});



module.exports=db;


