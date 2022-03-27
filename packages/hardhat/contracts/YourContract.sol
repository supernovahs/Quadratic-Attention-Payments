pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";

// import "@openzeppelin/contracts/access/Ownable.sol";
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract YourContract {
    struct Ad {
        uint256 id;
        string link;
    }

    struct TimeLeft {
        uint256 remainingtime;
    }

    TimeLeft public timeleft;
    Ad[] public ads;

    mapping(uint256 => TimeLeft) public IdtoTimeStamp;

    mapping(uint256 => bool) public IdtoSwitch;

    mapping(address => mapping(uint256 => uint256)) public AddresstoIdtoCounter;

    function NewAd(string memory _link) public payable {
        Ad memory ad;
        ad.id++;
        ad.link = _link;
        ads.push(ad);
        IdtoTimeStamp[ad.id].remainingtime = block.timestamp + 60 seconds;
        IdtoSwitch[ad.id] = true;
    }

    function calculator(
        address _address,
        uint256 _id,
        uint256 time
    ) public view returns (uint256) {
        uint256 n = AddresstoIdtoCounter[_address][_id];
        uint256 paymentForOneMinute = 300000000000000 * (n + 1);
        uint256 FinalPayment = paymentForOneMinute * time;
        return (FinalPayment);
    }

    function Pay(uint256 _id, uint256 timeInMinutes) public payable {
        require(
            msg.value == calculator(msg.sender, _id, timeInMinutes),
            "Check the amount u're sending"
        );
        AddresstoIdtoCounter[msg.sender][_id]++;
        IdtoTimeStamp[_id].remainingtime += timeInMinutes * 60;
    }

    function AdOff(uint256 _id) public {
        require(
            IdtoTimeStamp[_id].remainingtime < block.timestamp,
            "Time remaining Wait"
        );
        IdtoSwitch[_id] = false;
    }
}
