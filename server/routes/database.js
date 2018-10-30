var mysql = require("mysql");

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "123456",
      database: "cloudnote",
      port: 3306,
      charset: "UTF8_GENERAL_CI",
      timezone: "local",
      multipleStatements: false
    });
  }

  //  向note表中插入云笔记数据
  addNote(req, res) {
    console.log("database.js timeStamp"+req.query.timeStamp)
    this.connection.query("insert into note set ?", {
      nickname: req.query.nickName,
      title: req.query.title,
      content: req.query.content,
      txhash: req.query.txhash,
      timestamp: req.query.timeStamp
      // hdaddr: hdaddr
    }, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.sendStatus(200);
      }
    });
  }

  //  根据登录用户的id获取云笔记的name列表
  getNoteList(req, res) {
    this.connection.query("select * from note where ?", {
      nickname: req.query.nickName
    }, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  }

  //  更新云笔记
  updateNote(req, res) {
    console.log("updateNote database timestamp===>" +  req.query.timestamp );
    console.log("updateNote database title===>" +  req.query.title );
    console.log("updateNote database content===>" +  req.query.content);
    this.connection.query("update note set ? where timestamp=" + req.query.timestamp, {
      title:req.query.title, content: req.query.content
    }, function(err, result) {
      console.log(err+result);
      if (err) {
        console.log(err);
      } else {
        res.sendStatus(200);
      }
    });
  }
}

module.exports = Database;
