const express = require("express");                         //引入EXPRESS框架
const userrouter = require('./controller/userRouter');    //引入客户路由
const session = require("express-session");                //引入session模块
const mongodb = require("./models/mongodb");        //引入mongodb的数据库


const app = express();                                   //实例化ESPRESS


app.use(session({                                    //使用session中间件
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

//引入中间件

app.set("view engine", "ejs");                         //使用EJS模板
app.use(express.static("./public"));                   //静态PUBLIC
app.use("/avatar", express.static("./avatar"));        //静态avatar


//公共部分（客户端）

app.post("/userRegister", userrouter.userRegister);  //用户注册
app.post("/userLogin", userrouter.userLogin);  //用户注册


const server = app.listen(3000);                    //监听3000端口
const io = require('socket.io').listen(server);   //引入socket.io模块

let arrAllSocket = [];
io.on("connection", (socket) => {
    socket.on("CustomerService", (msg) => {
        let user = msg.username;
        arrAllSocket[user] = socket
    });


    socket.on("privateMessage", (from, to, msg) => {

        if (arrAllSocket[to]) {
            arrAllSocket[to].emit("privateMsg", from,to,msg);
            arrAllSocket[from].emit("privateMsg", from,to,msg);
        }
        else {
            arrAllSocket[from].emit("privateMsg",from,to,msg);
            let username = to;
            let onMessage = [];
            let t = msg.time;
            let time = t.slice(5);
            let b = {
                'direction':"right",
                'time':time,
                'rightContent': msg.message,
                'rightAvatar': msg.avatar,
                'state':"2"
            };

            onMessage.push(b);

            mongodb.find("userinfos", {"username": username}, (err, result) => {
                if (err) {
                    console.log(err)
                }
                else {
                    let chatList = result[0].chatList;
                    let c = chatList.concat(onMessage);
                    mongodb.updateMany('userinfos', {"username": username},
                        {
                            $set: {"chatList": c}
                        },
                        (err, result) => {
                            if (err) {
                                console.log(err)
                            }
                            else {

                                console.log("1")

                            }
                        }
                    )

                }
            })
        }

    })



});

console.log("SERVER START");                     //控制台打印服务器成功启动信息