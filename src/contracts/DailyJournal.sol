// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';

contract DailyJournal is Ownable {
  string public name = "Gregg`s Daily Journal";

  uint256 public taskCount = 0;
  mapping(uint256 => Task) public tasks;

  uint256 public entryCount = 0;
  mapping(uint256 => Entry) public entries;

  struct Task {
    uint256 entryId;
    uint256 id;
    string startTime;
    string endTime;
    string description;
  }

  struct Entry {
    uint256 id;
    string breakfast;
    string lunch;
    string dinner;
    string meditation;
    string day;
    string date;
  }

  event TaskCreated(
    uint256 entryId,
    uint256 id,
    string startTime,
    string endTime,
    string description
  );

  event EntryCreated(
    uint256 id, 
    string breakfast,
    string lunch,
    string dinner,
    string meditation,
    string day,
    string date
  );

  constructor(
    string memory _breakfast,
    string memory _lunch,
    string memory _dinner,
    string memory _meditation,
    string memory _day,
    string memory _date, 
    uint256 _taskCount,
    string[] memory _startTime,
    string[] memory _endTime,
    string[] memory _description
  ) 
  {
    createEntry(_breakfast, _lunch, _dinner, _meditation, _day, _date);
    createTasks(entryCount, _taskCount, _startTime, _endTime, _description);
  }

  function createEntry(
    string memory _breakfast,
    string memory _lunch,
    string memory _dinner,
    string memory _meditation,
    string memory _day,
    string memory _date
  ) 
    public onlyOwner() returns(uint256 _id)
  {
    require(bytes(_day).length > 0, 'DailyJournal: day is empty string');
    require(bytes(_date).length > 0, 'DailyJournal: date is empty string');

    entryCount++;

    entries[entryCount] = Entry(entryCount,_breakfast, _lunch, _dinner, _meditation, _day, _date);

    emit EntryCreated(entryCount, _breakfast, _lunch, _dinner, _meditation, _day, _date);

    return entryCount;
  }

  function createTasks(
    uint256 _entryId,
    uint256 _numOfTasks, 
    string[] memory _startTime, 
    string[] memory _endTime, 
    string[] memory _description
  ) 
    internal onlyOwner() 
  {

    for(uint256 i=1; i<=_numOfTasks; i++) {
      createTask(_entryId, _startTime[taskCount], _endTime[taskCount], _description[taskCount]);
    }

  }

  function createTask(
    uint256 _entryId,
    string memory _startTime,
    string memory _endTime,
    string memory _description
  ) 
    public onlyOwner() 
  {
    require(bytes(_startTime).length > 0, 'DailyJournal: startTime is empty string');
    require(bytes(_endTime).length > 0, 'DailyJournal: endTime is empty string');
    require(bytes(_description).length > 0, 'DailyJournal: date is empty string');

    taskCount++;

    tasks[taskCount] = Task(_entryId, taskCount, _startTime, _endTime, _description);

    emit TaskCreated(_entryId, taskCount, _startTime, _endTime, _description);
  }

}