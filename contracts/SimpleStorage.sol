// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SimpleStorage {
    string public message; //"" by default
    address public owner;

    // event
    event NewMessage(string message);
    // this is executed during the deployment
   
   modifier onlyOwner() {
    require(msg.sender == owner, "Error Only Owner!");
    _;
   }
    constructor(string memory _message) {
        message = _message;
        owner = msg.sender;

    }


    function setMessage(string memory newMessage) public onlyOwner{
         message = newMessage;
        owner = msg.sender;
        emit NewMessage(message);
    }
}


///events are searchable, event can be undesrtood as console.log() for blockchain