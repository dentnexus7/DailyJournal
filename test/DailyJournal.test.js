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

    it('has correct first entry', async() => {
      const entry = await contract.entries(1);
      assert.equal(entry.id, 1);
      assert.equal(entry.day, "Tuesday");
      assert.equal(entry.date, "January 4th, 2022");
      assert.equal(entry.breakfast, "");
      assert.equal(entry.lunch, "");
      assert.equal(entry.dinner, "");
      assert.equal(entry.meditation, "");
      // assert.equal(entry.startTime, "5:45am");
      // assert.equal(entry.endTime, "10am");
      // assert.equal(entry.description, "DailyJournal has been deployed!");
    });
  });

  describe('createEntry', async() => {
    let result, entryCount;

    before(async() => {
      result = await contract.createEntry("Tuesday", "January 4th, 2022", "None", "None", "Sonic", "Meditation");
      entryCount = await contract.entryCount();
    });

    describe('creates a new entry', async() => {

      it('success', async() => {
        // SUCCESS
        assert.equal(entryCount, 2);
        const event = result.logs[0].args;
        assert.equal(event.id.toNumber(), entryCount.toNumber());
        assert.equal(event.day, "Tuesday");
        assert.equal(event.date, "January 4th, 2022");
        assert.equal(event.breakfast, "None");
        assert.equal(event.lunch, "None");
        assert.equal(event.dinner, "Sonic");
        assert.equal(event.meditation, "Meditation");
        // assert.equal(event.startTime, "10am");
        // assert.equal(event.endTime, "3pm");
        // assert.equal(event.description, "Added Udemy Course code repositories to my Github Account");
      });

      it('failure', async() => {
        // FAILURE: Only owner can create entries
        await contract.createEntry("Test", "Test", "Test", "Test", "Test", "Test", { from: account2}).should.be.rejected;

        // FAILURE: Day cannot be empty string
        await contract.createEntry("", "Test", "Test", "Test", "Test", "Test").should.be.rejected;

        // FAILURE: Date cannot be empty string
        await contract.createEntry("Test", "", "Test", "Test", "Test").should.be.rejected;

        // // FAILURE: endTime cannot be empty string
        // await contract.createEntry("Test", "Test", "", "Entry").should.be.rejected;

        // // FAILURE: description cannot be empty string
        // await contract.createEntry("Test", "Test", "Test", "").should.be.rejected;
      });
    });

    it('lists entries', async () => {
      const entry = await contract.entries(entryCount);
      assert.equal(entry.id.toNumber(), entryCount.toNumber());
      assert.equal(entry.day, "Tuesday");
      assert.equal(entry.date, "January 4th, 2022");
      assert.equal(entry.breakfast, "None");
      assert.equal(entry.lunch, "None");
      assert.equal(entry.dinner, "Sonic");
      assert.equal(entry.meditation, "Meditation");
      // assert.equal(entry.startTime, "10am");
      // assert.equal(entry.endTime, "3pm");
      // assert.equal(entry.description, "Added Udemy Course code repositories to my Github Account");
    });
  });
});