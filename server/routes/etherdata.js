var Web3 = require("web3");
var fs = require("fs");
var Tx = require("ethereumjs-tx");

var ethabi = require("web3-eth-abi");

class EtherData {
  constructor() {
    this.contractAddress = "0x4821f5c31dc356119d80c062c825a2f9c0ff8eaa";
    this.gasPrice = "0x3B9ACA00";
    this.web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/oOYCD7wiWl5A2e65OaEZ'));
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
    var nonce = this.web3.eth.getTransactionCount("0xe4ea318e4456A821E467658ec19297D727Cb8bF5");
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
    const privateKey = new Buffer("549c22cea5cc8a7858d0f2ccc9600bc3cad9c0c6d168110d55e056f3af3e575d", "hex");
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
