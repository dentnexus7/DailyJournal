// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';

contract DailyJournal is Ownable {
  string public name = "Gregg`s Daily Journal";
  uint256 public entryCount = 0;
  mapping(uint => Entry) public entries;

  // struct Task {
  //   string startTime;
  //   string endTime;
  //   string[] description;
  // }

  struct Entry {
    uint256 id;
    string day;
    string date;
    string breakfast;
    string lunch;
    string dinner;
    string meditation;
    //Task[] tasks;
  }

  event EntryCreated(
    uint256 id, 
    string day,
    string date, 
    string breakfast,
    string lunch,
    string dinner,
    string meditation
    //Task[] tasks
  );

  constructor(
    string memory _day,
    string memory _date, 
    string memory _breakfast,
    string memory _lunch,
    string memory _dinner,
    string memory _meditation
    //Task[] memory _tasks
  ) {
    createEntry(_day, _date, _breakfast, _lunch, _dinner, _meditation);
  }

  function createEntry(
    string memory _day,
    string memory _date, 
    string memory _breakfast,
    string memory _lunch,
    string memory _dinner,
    string memory _meditation
    //Task[] memory _tasks
  ) public onlyOwner() {

    require(bytes(_day).length > 0, 'DailyJournal: day is empty string');
    require(bytes(_date).length > 0, 'DailyJournal: date is empty string');
    //require(bytes(_tasks.startTime).length > 0, 'DailyJournal: startTime is empty string');
    //require(bytes(_tasks.endTime).length > 0, 'DailyJournal: endTime is empty string');
    //require(bytes(_tasks._description).length > 0, 'DailyJournal: date is empty string');

    entryCount++;
    entries[entryCount] = Entry(entryCount, _day, _date, _breakfast, _lunch, _dinner, _meditation);
    emit EntryCreated(entryCount, _day, _date, _breakfast, _lunch, _dinner, _meditation);
  }

}