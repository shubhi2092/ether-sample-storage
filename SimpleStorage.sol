//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 public favoriteNumber;
    struct People {
        uint256 favoriteNumber;
        string name;
    }
    People[] public people;
    mapping(string => uint256) public nameToFavNumbers;

    function store(uint256 _favNum) public virtual {
        favoriteNumber = _favNum;
    }

    function retrive() public view returns (uint256) {
        return favoriteNumber;
    }

    function addPersons(uint _favNum, string memory _name) public {
        people.push(People(_favNum, _name));
        nameToFavNumbers[_name] = _favNum;
    }
}
