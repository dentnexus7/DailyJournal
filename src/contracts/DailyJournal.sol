// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';

contract DailyJournal is Ownable {
  string public name = "Gregg`s Daily Journal";
  uint256 public entryCount = 0;
  mapping(uint => Entry) public entries;

  struct Entry {
    uint256 id;
    string date;
    string startTime;
    string endTime;
    string description;
  }

  event EntryCreated(uint256 id, string date, string startTime, string endTime, string description);

  constructor(string memory _date, string memory _startTime, string memory _endTime, string memory _description) {
    createEntry(_date, _startTime, _endTime, _description);
  }

  function createEntry(string memory _date, string memory _startTime, string memory _endTime, string memory _description) public onlyOwner() {
    require(bytes(_date).length > 0, 'DailyJournal: date is empty string');
    require(bytes(_startTime).length > 0, 'DailyJournal: startTime is empty string');
    require(bytes(_endTime).length > 0, 'DailyJournal: endTime is empty string');
    require(bytes(_description).length > 0, 'DailyJournal: date is empty string');

    entryCount++;
    entries[entryCount] = Entry(entryCount, _date, _startTime, _endTime, _description);
    emit EntryCreated(entryCount, _date, _startTime, _endTime, _description);
  }

}