// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';

/// @title Gregg's Daily Journal
/// @author Gregg W. Dent
/// @notice This contract is used to create entries and tasks in the journal
/// @dev All function calls are currently implemented without side effects
contract DailyJournal is Ownable {

  /// @notice The name of the Contract
  /// @dev This is the name that will be displayed on the front-end
  string public name = "Gregg`s Daily Journal";

  /// @notice The amount of tasks in the tasks mapping
  /// @dev This will be used to list the tasks mapping
  uint256 public taskCount = 0;

  /// @notice A mapping of the tasks that are stored on the contract
  /// @dev This will be used to store the tasks created
  mapping(uint256 => Task) public tasks;

  /// @notice The amount of entries in the entries mapping
  /// @dev This will be used to list the entries mapping
  uint256 public entryCount = 0;

  /// @notice A mapping of the entries that are stored on the contract
  /// @dev This will be used to store the entries created
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

  /// @notice Event for when a task is created
  /// @dev This will be emitted when a task is created
  /// @param entryId The entryId the task is associated with that is indexed
  /// @param id The id of the task that is indexed
  /// @param startTime The time the task started
  /// @param endTime The time the task ended
  /// @param description Details about the task
  event TaskCreated(
    uint256 indexed entryId,
    uint256 indexed id,
    string startTime,
    string endTime,
    string description
  );

  /// @notice Event for when an entry is created
  /// @dev This will be emitted when an entry is created
  /// @param id The id of the entry that is indexed
  /// @param breakfast What breakfast was that day
  /// @param lunch What lunch was that day
  /// @param dinner What dinner was that day
  /// @param meditation How long was meditation that day
  /// @param day What day it is
  /// @param date What date it is
  event EntryCreated(
    uint256 indexed id, 
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

  /// @notice Create an Entry with the given daily data
  /// @dev The day and date must not be empty
  /// @param _breakfast What breakfast was that day
  /// @param _lunch What lunch was that day
  /// @param _dinner What dinner was that day
  /// @param _meditation How long was meditation that day
  /// @param _day What day it is
  /// @param _date What date it is
  function createEntry(
    string memory _breakfast,
    string memory _lunch,
    string memory _dinner,
    string memory _meditation,
    string memory _day,
    string memory _date
  ) 
    public onlyOwner()
  {
    require(bytes(_day).length > 0, 'DailyJournal: day is empty string');
    require(bytes(_date).length > 0, 'DailyJournal: date is empty string');

    entryCount++;

    entries[entryCount] = Entry(entryCount,_breakfast, _lunch, _dinner, _meditation, _day, _date);

    emit EntryCreated(entryCount, _breakfast, _lunch, _dinner, _meditation, _day, _date);
  }

  /// @notice This creates the initial tasks when the contract is created
  /// @dev This is an internal function that is only called when the contract is created
  /// @param _entryId The entry id the tasks are associated with
  /// @param _numOfTasks The number of tasks to create
  /// @param _startTime The start times of the tasks
  /// @param _endTime The end times of the tasks
  /// @param _description Details of the tasks
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

  /// @notice Create a Task with the given task data
  /// @dev The start time, end time, and description must not be empty
  /// @param _entryId The entry id the task is associated with
  /// @param _startTime The start time of the task
  /// @param _endTime The end time of the task
  /// @param _description Details about the task 
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