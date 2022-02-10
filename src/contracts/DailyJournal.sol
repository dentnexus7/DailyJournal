// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';

contract DailyJournal is Ownable {
  string public name = "Gregg`s Daily Journal";
  uint256 public entryCount = 0;
  mapping(uint => Entry) public entries;

  struct Task {
    string startTime;
    string endTime;
    string description;
  }

  struct Entry {
    uint256 id;
    string day;
    string date;
    string breakfast;
    string lunch;
    string dinner;
    string meditation;
    Task task;
  }

  event EntryCreated(
    uint256 id, 
    string day,
    string date, 
    string breakfast,
    string lunch,
    string dinner,
    string meditation,
    string startTime,
    string endTime,
    string description
  );

  constructor(
    string memory _day,
    string memory _date, 
    string memory _breakfast,
    string memory _lunch,
    string memory _dinner,
    string memory _meditation,
    string memory _startTime,
    string memory _endTime,
    string memory _description
  ) {
    createEntry(_day, _date, _breakfast, _lunch, _dinner, _meditation, _startTime, _endTime, _description);
  }

  function createEntry(
    string memory _day,
    string memory _date, 
    string memory _breakfast,
    string memory _lunch,
    string memory _dinner,
    string memory _meditation,
    string memory _startTime,
    string memory _endTime,
    string memory _description
  ) public onlyOwner() {

    require(bytes(_day).length > 0, 'DailyJournal: day is empty string');
    require(bytes(_date).length > 0, 'DailyJournal: date is empty string');
    require(bytes(_startTime).length > 0, 'DailyJournal: startTime is empty string');
    require(bytes(_endTime).length > 0, 'DailyJournal: endTime is empty string');
    require(bytes(_description).length > 0, 'DailyJournal: date is empty string');

    entryCount++;
    
    Task memory _task = Task(_startTime, _endTime, _description);

    entries[entryCount] = Entry(entryCount, _day, _date, _breakfast, _lunch, _dinner, _meditation, _task);

    emit EntryCreated(entryCount, _day, _date, _breakfast, _lunch, _dinner, _meditation, _startTime, _endTime, _description);
  }

}