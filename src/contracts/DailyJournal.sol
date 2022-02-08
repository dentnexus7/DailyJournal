// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract DailyJournal {
  string public name = "Gregg's Daily Journal";
  uint256 public entryCount = 0;
  mapping(uint256 => Entry) public entries;

  struct Entry {
    uint256 date;
    uint256 startTime;
    uint256 endTime;
    string description;
  }

  constructor(uint256 _date, uint256 _startTime, uint256 _endTime, string memory _description) {
    createEntry(_date, _startTime, _endTime, _description);
  }

  function createEntry(uint256 _date, uint256 _startTime, uint256 _endTime, string memory _description) public {
    Entry memory entry = Entry(_date, _startTime, _endTime, _description);
    entries[entryCount] = entry;
    entryCount++;
  }

  
}