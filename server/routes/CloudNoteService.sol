pragma solidity ^0.4.0;
//  用于保存云笔记内容的智能合约
/*
mapping  userId  name content
*/
contract CloudNoteService {
    //  用于保存所有账户的云笔记
    //  UserId                 name      content
    mapping(string => mapping(string => string)) private data;

    function CloudNoteService(){

    }
    //  添加云笔记
    function addNote(string id, string name, string content) public
    {


        data[id][name] = content;
    }

    function updateNote(string id, string name, string content) public
    {


        data[id][name] = content;
    }
    function getNote(string id, string name) view public returns(string)
    {
        return data[id][name];
    }
    /*
    添加云笔记
    addNote

    更新云笔记
    updateNote

    获取云笔记内容
    getNote
    */
}
