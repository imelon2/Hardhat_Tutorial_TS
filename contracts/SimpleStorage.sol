// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    string private message;
    address public owner;

    event MessageChanged(string newMessage);

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not an owner");
        _;
    }

    constructor(string memory NewMessage) {
        message = NewMessage;
        owner = msg.sender;
    }

    // Chech-Effects-Interaction pattern
    function setMessage(string memory newMessage) public onlyOwner {
        require(bytes(newMessage).length > 0,"Empty string not allowed");

        message = newMessage;

        emit MessageChanged(newMessage);
    }

    function getMessage() public view returns(string memory) {
        return message;
    }

}