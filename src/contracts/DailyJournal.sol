// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';

contract DailyJournal is Ownable {
  string public name = "Gregg's Daily Journal";
  uint256 public entryCount = 0;
  mapping(uint => Entry) public entries;

  struct Entry {
    uint256 id;
    uint256 date;
    uint256 startTime;
    uint256 endTime;
    string description;
  }

  event EntryCreated(uint256 id, uint256 date, uint256 startTime, uint256 endTime, string description);

  constructor(uint256 _date, uint256 _startTime, uint256 _endTime, string memory _description) {
    createEntry(_date, _startTime, _endTime, _description);
  }

  function createEntry(uint256 _date, uint256 _startTime, uint256 _endTime, string memory _description) public onlyOwner() {
    entryCount++;
    entries[entryCount] = Entry(entryCount, _date, _startTime, _endTime, _description);
    emit EntryCreated(entryCount, _date, _startTime, _endTime, _description);
  }

}