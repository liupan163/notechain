/**
 * ajax 服务路由集合
 * web3.eth.sendRawTransaction
 web3.eth.call
 npm install --save web3
 npm install --save ethereumjs-tx
 npm install --save web3-eth-abi

 npm install -g cnpm -registry=https://registry.npm.taobao.org
 cnpm install --save ethereumjs-tx
 cnpm install --save web3-eth-abi
 */
var express = require("express");
var router = express.Router();
var Database = require("./database");
var db = new Database();

router.get("/addNote", function(req, res, next) {
  // 先根据用户nickName,在数据库找到其对应HD地址  (通用方法)
  var txhash = global.etherData.addNote(req.query.nickName, req.query.title, req.query.content);
  console.log("index.js" + txhash)
  console.log("index.js timeStamp" + Date.parse(new Date()))
  req.query["timeStamp"] = Date.parse(new Date());
  req.query["txhash"] = txhash;// 链上拿到TXhash
  // 本地数据库保存1、微信号2、标题3、内容4、TXhash
  // 差参数:HD地址
  db.addNote(req, res);
});
router.get("/updateNote", function(req, res, next) {
  console.log("updateNote timeStamp===>" +  req.query.timestamp);
  req.query["txhash"] = global.etherData.updateNote(req.query.nickname, req.query.title, req.query.content);
  console.log("updateNote timeStamp===>" +  req.query.timestamp);
  db.updateNote(req, res);
});
router.get("/getNote", function(req, res, next) {
  res.send({ content: global.database.getNote(req.query.id, req.query.name) });
});
router.get("/status", function(req, res, next) {
  var result = global.etherData.queryTransactionStatus(res.query.hash);
  if (result == null) {
    res.send({ info: 2 });
  } else if (result === 1) {
    res.send({ info: 1 });
  } else {
    res.send({ info: 0 });
  }
});
router.get("/getList", function(req, res, next) {
  db.getNoteList(req, res);
});

module.exports = router;
