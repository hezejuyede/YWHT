const mongodb = require("../models/mongodb.js");        //引入mongodb的数据库
const md5 = require("../models/md5.js");               //引入MD5加密
const formidable = require("formidable");             //引入formidable
const path = require('path');                        //引入PATH模块
const fs = require('fs');                           //引入FS模块
const gm = require('gm');                          //引入GM
const ObjectId = require('mongodb').ObjectID;     //引入OjeckID模块


let left =[{text: "一级导航A",child: [{text: "二级导航A-A",child:[{ text: "二级导航A-A-A"},{ text: "二级导航A-A-B"},{ text: "二级导航A-A-C"},{ text: "二级导航A-A-D"},{ text: "二级导航A-A-E"}]},{text: "二级导航A-B",child:[{ text: "二级导航A-B-A"},{ text: "二级导航A-C-B"},{ text: "二级导航A-D-C"},{ text: "二级导航A-E-D"},{ text: "二级导航A-F-E"}]},{text: "二级导航A-C",child:[{ text: "二级导航A-C-A"},{ text: "二级导航A-C-B"},{ text: "二级导航A-C-C"},{ text: "二级导航A-C-D"},{ text: "二级导航A-C-E"}]},{text: "二级导航A-D",child:[{ text: "二级导航A-D-A"},{ text: "二级导航A-D-B"},{ text: "二级导航A-D-C"},{ text: "二级导航A-D-D"},{ text: "二级导航A-D-E"}]},{text: "二级导航A-E",child:[{ text: "二级导航A-E-A"},{ text: "二级导航A-E-B"},{ text: "二级导航A-E-V"},{ text: "二级导航A-E-D"},{ text: "二级导航A-E-E"}]}]}]
  /*  [
        {
            text: "一级导航A",
            child: [
                {
                    text: "二级导航A-A",
                    child:
                        [
                            {text: "二级导航A-A-A"},
                            {text: "二级导航A-A-B"},
                            {text: "二级导航A-A-C"},
                            {text: "二级导航A-A-D"},
                            {text: "二级导航A-A-E"}
                        ]
                },
                {
                    text: "二级导航A-B",
                    child:
                        [
                            {text: "二级导航A-B-A"},
                            {text: "二级导航A-C-B"},
                            {text: "二级导航A-D-C"},
                            {text: "二级导航A-E-D"},
                            {text: "二级导航A-F-E"}
                        ]
                },
                {
                    text: "二级导航A-C",
                    child:
                        [
                            {text: "二级导航A-C-A"},
                            {text: "二级导航A-C-B"},
                            {text: "二级导航A-C-C"},
                            {text: "二级导航A-C-D"},
                            {text: "二级导航A-C-E"}
                        ]
                },
                {
                    text: "二级导航A-D",
                    child:
                        [
                            {text: "二级导航A-D-A"},
                            {text: "二级导航A-D-B"},
                            {text: "二级导航A-D-C"},
                            {text: "二级导航A-D-D"},
                            {text: "二级导航A-D-E"}
                        ]
                },
                {
                    text: "二级导航A-E",
                    child:
                        [
                            {text: "二级导航A-E-A"},
                            {text: "二级导航A-E-B"},
                            {text: "二级导航A-E-V"},
                            {text: "二级导航A-E-D"},
                            {text: "二级导航A-E-E"}
                        ]
                }
            ]
        },
        {
            text: "一级导航B",
            child: [
                {
                    text: "二级导航B-A",
                    child:
                        []
                },
                {
                    text: "二级导航B-B",
                    child:
                        []
                },
                {
                    text: "二级导航A-C",
                    child:
                        [
                            {text: "二级导航A-C-A"},
                            {text: "二级导航A-C-B"},
                            {text: "二级导航A-C-V"},
                            {text: "二级导航A-C-D"},
                            {text: "二级导航A-C-E"}
                        ]
                },
                {
                    text: "二级导航A-D",
                    child:
                        [
                            {text: "二级导航A-D-A"},
                            {text: "二级导航A-D-B"},
                            {text: "二级导航A-D-V"},
                            {text: "二级导航A-D-D"},
                            {text: "二级导航A-D-E"}
                        ]
                },
                {
                    text: "二级导航A-E",
                    child:
                        [
                            {text: "二级导航A-E-A"},
                            {text: "二级导航A-E-B"},
                            {text: "二级导航A-E-V"},
                            {text: "二级导航A-E-D"},
                            {text: "二级导航A-E-E"}
                        ]
                }
            ]
        },
        {
            text: "一级导航C",
            child: [
                {
                    text: "二级导航C-A",
                    child:
                        [
                            {text: "二级导航C-A-A"},
                            {text: "二级导航C-A-B"},
                            {text: "二级导航C-A-C"},
                            {text: "二级导航C-A-D"},
                            {text: "二级导航C-A-E"}
                        ]
                },
                {
                    text: "二级导航A-B",
                    child:
                        [
                            {text: "二级导航A-B-A"},
                            {text: "二级导航A-C-B"},
                            {text: "二级导航A-D-V"},
                            {text: "二级导航A-E-D"},
                            {text: "二级导航A-F-E"}
                        ]
                },
                {
                    text: "二级导航A-C",
                    child:
                        [
                            {text: "二级导航A-C-A"},
                            {text: "二级导航A-C-B"},
                            {text: "二级导航A-C-V"},
                            {text: "二级导航A-C-D"},
                            {text: "二级导航A-C-E"}
                        ]
                },
                {
                    text: "二级导航A-D",
                    child:
                        [
                            {text: "二级导航A-D-A"},
                            {text: "二级导航A-D-B"},
                            {text: "二级导航A-D-V"},
                            {text: "二级导航A-D-D"},
                            {text: "二级导航A-D-E"}
                        ]
                },
                {
                    text: "二级导航A-E",
                    child:
                        [
                            {text: "二级导航A-E-A"},
                            {text: "二级导航A-E-B"},
                            {text: "二级导航A-E-V"},
                            {text: "二级导航A-E-D"},
                            {text: "二级导航A-E-E"}
                        ]
                }
            ]
        },
        {
            text: "一级导航D",
            child: [
                {
                    text: "二级导航D-A",
                    child:
                        [
                            {text: "二级导航D-A-A"},
                            {text: "二级导航D-A-B"},
                            {text: "二级导航D-A-C"},
                            {text: "二级导航D-A-D"},
                            {text: "二级导航D-A-E"}
                        ]
                },
                {
                    text: "二级导航A-B",
                    child:
                        [
                            {text: "二级导航A-B-A"},
                            {text: "二级导航A-C-B"},
                            {text: "二级导航A-D-V"},
                            {text: "二级导航A-E-D"},
                            {text: "二级导航A-F-E"}
                        ]
                },
                {
                    text: "二级导航A-C",
                    child:
                        [
                            {text: "二级导航A-C-A"},
                            {text: "二级导航A-C-B"},
                            {text: "二级导航A-C-V"},
                            {text: "二级导航A-C-D"},
                            {text: "二级导航A-C-E"}
                        ]
                },
                {
                    text: "二级导航A-D",
                    child:
                        [
                            {text: "二级导航A-D-A"},
                            {text: "二级导航A-D-B"},
                            {text: "二级导航A-D-V"},
                            {text: "二级导航A-D-D"},
                            {text: "二级导航A-D-E"}
                        ]
                },
                {
                    text: "二级导航A-E",
                    child:
                        [
                            {text: "二级导航A-E-A"},
                            {text: "二级导航A-E-B"},
                            {text: "二级导航A-E-V"},
                            {text: "二级导航A-E-D"},
                            {text: "二级导航A-E-E"}
                        ]
                }
            ]
        },
        {
            text: "一级导航E",
            child: [
                {
                    text: "二级导航E-A",
                    child:
                        [
                            {text: "二级导航E-A-A"},
                            {text: "二级导航E-A-B"},
                            {text: "二级导航E-A-C"},
                            {text: "二级导航E-A-D"},
                            {text: "二级导航E-A-E"}
                        ]
                },
                {
                    text: "二级导航A-B",
                    child:
                        [
                            {text: "二级导航A-B-A"},
                            {text: "二级导航A-C-B"},
                            {text: "二级导航A-D-V"},
                            {text: "二级导航A-E-D"},
                            {text: "二级导航A-F-E"}
                        ]
                },
                {
                    text: "二级导航A-C",
                    child:
                        [
                            {text: "二级导航A-C-A"},
                            {text: "二级导航A-C-B"},
                            {text: "二级导航A-C-V"},
                            {text: "二级导航A-C-D"},
                            {text: "二级导航A-C-E"}
                        ]
                },
                {
                    text: "二级导航A-D",
                    child:
                        [
                            {text: "二级导航A-D-A"},
                            {text: "二级导航A-D-B"},
                            {text: "二级导航A-D-V"},
                            {text: "二级导航A-D-D"},
                            {text: "二级导航A-D-E"}
                        ]
                },
                {
                    text: "二级导航A-E",
                    child:
                        [
                            {text: "二级导航A-E-A"},
                            {text: "二级导航A-E-B"},
                            {text: "二级导航A-E-V"},
                            {text: "二级导航A-E-D"},
                            {text: "二级导航A-E-E"}
                        ]
                }
            ]
        }


    ];*/

//注册
exports.userRegister = (req, res, next) => {

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        var password1 = fields.password1;
        let time = fields.time;
        password1 = md5(md5(password1).substr(4, 7) + md5(password1));
        mongodb.find("userinfos", {"username": fields.username1}, (err, result) => {
            if (err) {
                res.json("-2");
                return;
            }
            if (result.length !== 0) {
                res.json("2");

            }
            else {
                mongodb.insertOne("userinfos", {
                    "username": fields.username1,
                    "password": password1,
                    "phone": fields.phone,
                    "email": fields.email,
                    "avatar": "http://www.ilqiqi.top/pc/img/content/content_banner/no_login.jpg",
                    "time ": time,
                    "name": "",
                    "age": "",
                    "sex": "",
                    "balance": 0.00,
                    "collection": [],
                    "address": [],
                    "shoppingCart": ""
                }, function (err, rusult) {
                    if (err) {
                        res.json("-1");

                    }
                    else {
                        res.json("1");
                    }
                })
            }
        })
    })

};


//登录
exports.userLogin = (req, res, next) => {

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        var password = fields.password;
        password = md5((md5(password).substr(4, 7) + md5(password)));
        mongodb.find("userinfos", {"username": fields.username}, (err, rusult) => {
            if (rusult.length == 0) {
                res.json("2");
                return
            }
            var mongodbpassword = rusult[0].password;
            if (mongodbpassword == password) {
                req.session.login = "1";
                req.session.username = rusult[0].username;
                req.session.useravatar = rusult[0].avatar;
                res.json({
                    state: req.session.login,
                    username: req.session.username,
                    avatar: req.session.useravatar
                });
            }
            else {
                res.json("-1")
            }
        })
    })
};

exports.YWHomeLeftNav = (req,res,next)=>{
    res.json(left)

};
exports.getObjectData = (req,res,next)=>{
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        let width = fields.width;
        let text = fields.text;
        console.log(width)
        console.log(text)

    })

};