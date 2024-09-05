// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TokenTix is ERC721{
    uint public occCount;
    uint public tixCount;
    struct Occasion {
        uint id;
        string name;
        uint price;
        uint noOfTickets;
        string date;
        string location;
        string time;
    }
    mapping(uint => Occasion) occasions;
    mapping(uint => mapping(uint=> address)) public seatOwner;
    mapping(uint => uint[]) bookedSeats;
    mapping(uint => mapping(address => bool)) public hasTicket;
    address public owner;
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
owner = msg.sender;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
        }

    function createOccasion(string memory _name, uint _price, uint _noOfTickets,
    string memory _date, string memory _location, string memory _time) onlyOwner public {
        occCount++;
        occasions[occCount] = Occasion(occCount, _name, _price, _noOfTickets, _date, _location, _time);
        }
    function getOccasion (uint _id) public view returns (Occasion memory) {
            return occasions[_id];
        }
    function buyTicket(uint _id, uint _seat) public payable {
        occasions[_id].noOfTickets--;
        seatOwner[_id][_seat] = msg.sender;
        bookedSeats[_id].push(_seat);
        hasTicket[_id][msg.sender] = true;
        tixCount++;
        _safeMint(msg.sender, tixCount);
    }
}
