const DailyJournal = artifacts.require("DailyJournal");

module.exports = function (deployer) {
  deployer.deploy(DailyJournal);
};