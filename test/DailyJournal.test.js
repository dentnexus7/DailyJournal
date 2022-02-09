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
      assert.equal(entry.date, 1);
      assert.equal(entry.startTime, 2);
      assert.equal(entry.endTime, 3);
      assert.equal(entry.description, "DailyJournal has been deployed!");
    });
  });

  describe('createEntry', async() => {
    let result, entryCount;

    before(async() => {
      result = await contract.createEntry(9, 8, 7, "Entry");
      entryCount = await contract.entryCount();
    });

    describe('creates a new entry', async() => {

      it('success', async() => {
        // SUCCESS
        assert.equal(entryCount, 2);
        //console.log(result.logs);
        const event = result.logs[0].args;
        assert.equal(event.id.toNumber(), entryCount.toNumber());
        assert.equal(event.date, 9);
        assert.equal(event.startTime, 8);
        assert.equal(event.endTime, 7);
        assert.equal(event.description, "Entry");
      });

      it('failure', async() => {
        // FAILURE: Only owner can create entries
        await contract.createEntry(1, 2, 3, "Entry", { from: account2}).should.be.rejected;

        // FAILURE: Date must be greater than 0
        await contract.createEntry(0, 2 ,3, "Entry").should.be.rejected;

        // FAILURE: startTime must be greater than 0
        await contract.createEntry(1, 0 ,3, "Entry").should.be.rejected;

        // FAILURE: endTime must be greater than 0
        await contract.createEntry(1, 2 ,0, "Entry").should.be.rejected;
      });
    });

    it('lists entries', async () => {
      const entry = await contract.entries(entryCount);
      assert.equal(entry.id.toNumber(), entryCount.toNumber());
      assert.equal(entry.date, 9);
      assert.equal(entry.startTime, 8);
      assert.equal(entry.endTime, 7);
      assert.equal(entry.description, 'Entry');
    });
  });
});