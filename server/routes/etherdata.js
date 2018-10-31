var Web3 = require("web3");
var fs = require("fs");
var Tx = require("ethereumjs-tx");

var ethabi = require("web3-eth-abi");

class EtherData {
  constructor() {
    this.contractAddress = "0xfb2c2cb5509195111435c9fda305a8350b68760a";
    this.gasPrice = "0x3B9ACA00";
    this.web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/8d21395d2a73485096ca061252314e78'));
    this.abi = JSON.parse(fs.readFileSync("./CloudNoteService_sol_CloudNoteService.abi", "utf-8").toString());
    this.contract = this.web3.eth.contract(this.abi).at(this.contractAddress);
  }

  /*
      addNote
      updateNote
      getNote
      queryTransactionStatus
       */
  getNonce() {
    // 调用地址
    var nonce = this.web3.eth.getTransactionCount("0xc0C4824527fFB27a51034CeA1e37840ED69A5f1e");
    return nonce;
  }

  addUpdateNote(nickName, title, content, notefun) {
    var estimateGas = this.web3.eth.estimateGas({
      to: this.contractAddress,
      data: notefun
    });
    estimateGas = this.web3.toHex(estimateGas);
    var nonce = global.getNextNonce();
    var rawTx = {
      nonce: nonce,
      gasPrice: this.gasPrice,
      gasLimit: estimateGas,
      to: this.contractAddress,
      value: "0x00",
      data: notefun
    };
    var tx = new Tx(rawTx);
    const privateKey = new Buffer("2BA807775231B37E3D92CA76AD071E9D1B7CCDB8752B9B738174EA2E75FC0D4C", "hex");
    tx.sign(privateKey);
    var serializedTx = tx.serialize();
    return this.web3.eth.sendRawTransaction("0x" + serializedTx.toString("hex"));
  }

  addNote(nickName, title, content) {
    var addNote = this.contract.addNote.getData(nickName, title, content);
    return this.addUpdateNote(nickName, title, content, addNote);
  }

  updateNote(nickName, title, content) {
    var updateNote = this.contract.updateNote.getData(nickName, title, content);
    return this.addUpdateNote(nickName, title, content, updateNote);
  }

  getNote(id, name) {
    var getNote = this.contract.getNode.getData(id, name);
    var result = this.web3.eth.call({
      to: this.contractAddress,
      data: getNote
    });
    return ethabi.decodeParameter("string", result);
  }

  queryTransactionStatus(hash) {
    var result = this.web3.eth.getTransactionReceipt(hash);
    if (result != null) {
      return parseInt(result.status, 16);
    }
    return null;
  }
}

module.exports = EtherData;
