const { assert } = require("chai");

const DailyJournal = artifacts.require('./DailyJournal');

require('chai')
  .use(require('chai-as-promised'))
  .should();

contract('DailyJournal', async([deployer, account2]) => {
  let contract;

  before(async () => {
    contract = await DailyJournal.deployed();
  });

  describe('deployment', async() => {
    
    it('deploys successfully', async() => {
      const address = contract.address;
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
      assert.notEqual(address, 0x0);
    });

    it('has correct name', async() => {
      const name = await contract.name();
      assert.equal(name, 'Gregg`s Daily Journal');
    });

    it('owner is deployer', async() => {
      const owner = await contract.owner();
      assert.equal(owner, deployer);
    });

    it('entryCount is 1', async() => {
      const entryCount = await contract.entryCount();
      assert.equal(entryCount, 1);
    });

    describe('has correct data', async() => {
      it('has correct first entry', async() => {
        const entry = await contract.entries(1);
        assert.equal(entry.id, 1);
        assert.equal(entry.breakfast, "");
        assert.equal(entry.lunch, "");
        assert.equal(entry.dinner, "");
        assert.equal(entry.meditation, "");
        assert.equal(entry.day, "Tuesday");
        assert.equal(entry.date, "January 4th, 2022");
      });
  
      it('has correct first task', async() => {
        const task = await contract.tasks(1);
        assert.equal(task.id, 1);
        assert.equal(task.startTime, "5:45am");
        assert.equal(task.endTime, "10am");
        assert.equal(task.description, "DailyJournal has been deployed!");
      });
  
      it('has correct second task', async() => {
        const task = await contract.tasks(2);
        assert.equal(task.id, 2);
        assert.equal(task.startTime, "10am");
        assert.equal(task.endTime, "3pm");
        assert.equal(task.description, "Added Udemy Course code repositories to my Github Account");
      });

      it('has correct third task', async() => {
        const task = await contract.tasks(3);
        assert.equal(task.id, 3);
        assert.equal(task.startTime, "3pm");
        assert.equal(task.endTime, "4pm");
        assert.equal(task.description, "Added to my LinkedIn Profile");
      });

      it('has correct fourth task', async() => {
        const task = await contract.tasks(4);
        assert.equal(task.id, 4);
        assert.equal(task.startTime, "4pm");
        assert.equal(task.endTime, "5pm");
        assert.equal(task.description, "Meditation");
      });

      it('has correct fifth task', async() => {
        const task = await contract.tasks(5);
        assert.equal(task.id, 5);
        assert.equal(task.startTime, "5pm");
        assert.equal(task.endTime, "7pm");
        assert.equal(task.description, "Researched Coding Tutorials; Ethers.js vs. Web3.js");
      });

      it('has correct sixth task', async() => {
        const task = await contract.tasks(6);
        assert.equal(task.id, 6);
        assert.equal(task.startTime, "7pm");
        assert.equal(task.endTime, "8pm");
        assert.equal(task.description, "Dinner");
      });

      it('has correct seventh task', async() => {
        const task = await contract.tasks(7);
        assert.equal(task.id, 7);
        assert.equal(task.startTime, "8pm");
        assert.equal(task.endTime, "10pm");
        assert.equal(task.description, "Relax");
      });
    });
  });

  describe('createEntry', async() => {
    let result, entryCount;

    before(async() => {
      result = await contract.createEntry("Tea; Smoothie; Protein Shake", "None", "Salmon, Broccoli, Rice", "40 min Creativity and Inspiration", "Wednesday", "January 5th, 2022");
      entryCount = await contract.entryCount();
    });

    describe('creates a new entry', async() => {

      it('success', async() => {
        // SUCCESS
        assert.equal(entryCount, 2);
        const event = result.logs[0].args;
        assert.equal(event.id.toNumber(), entryCount.toNumber());
        assert.equal(event.breakfast, "Tea; Smoothie; Protein Shake");
        assert.equal(event.lunch, "None");
        assert.equal(event.dinner, "Salmon, Broccoli, Rice");
        assert.equal(event.meditation, "40 min Creativity and Inspiration");
        assert.equal(event.day, "Wednesday");
        assert.equal(event.date, "January 5th, 2022");
      });

      it('failure', async() => {
        // FAILURE: Only owner can create entries
        await contract.createEntry("Test", "Test", "Test", "Test", "Test", "Test", { from: account2}).should.be.rejected;

        // FAILURE: Day cannot be empty string
        await contract.createEntry("Test", "Test", "Test", "Test", "", "Test").should.be.rejected;

        // FAILURE: Date cannot be empty string
        await contract.createEntry("Test", "Test", "Test", "Test", "Test", "").should.be.rejected;
      });
    });

    it('lists entries', async () => {
      const entry = await contract.entries(entryCount);
      assert.equal(entry.id.toNumber(), entryCount.toNumber());
      assert.equal(entry.breakfast, "Tea; Smoothie; Protein Shake");
      assert.equal(entry.lunch, "None");
      assert.equal(entry.dinner, "Salmon, Broccoli, Rice");
      assert.equal(entry.meditation, "40 min Creativity and Inspiration");
      assert.equal(entry.day, "Wednesday");
      assert.equal(entry.date, "January 5th, 2022");
    });
  });

  describe('createTask', async() => {
    let result, taskCount;

    before(async() => {
      result = await contract.createTask(2, "5:45am", "10am", "Breakfast; 7 sun salutations, Full body stretch, shower");
      taskCount = await contract.taskCount();
    });

    describe('creates a new task', async() => {

      it('success', async() => {
        // SUCCESS
        assert.equal(taskCount, 8);
        const event = result.logs[0].args;
        assert.equal(event.entryId.toNumber(), 2);
        assert.equal(event.id.toNumber(), taskCount.toNumber());
        assert.equal(event.startTime, "5:45am");
        assert.equal(event.endTime, "10am");
        assert.equal(event.description, "Breakfast; 7 sun salutations, Full body stretch, shower");
      });

      it('failure', async() => {
        // FAILURE: Only owner can create entries
        await contract.createTask(2, "Test", "Test", "Test", { from: account2}).should.be.rejected;

        // FAILURE: startTime cannot be empty string
        await contract.createTask(2, "", "Test", "Test").should.be.rejected;

        // FAILURE: endTime cannot be empty string
        await contract.createTask(2, "Test", "", "Test").should.be.rejected;

        // FAILURE: description cannot be empty string
        await contract.createTask(2, "Test", "Test", "").should.be.rejected;
      });
    });

    it('lists tasks', async () => {
      const task = await contract.tasks(taskCount);
      assert.equal(task.entryId.toNumber(), 2);
      assert.equal(task.id.toNumber(), taskCount.toNumber());
      assert.equal(task.startTime, "5:45am");
      assert.equal(task.endTime, "10am");
      assert.equal(task.description, "Breakfast; 7 sun salutations, Full body stretch, shower");
    });
  });
});