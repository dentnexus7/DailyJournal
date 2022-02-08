const DailyJournal = artifacts.require("DailyJournal");

module.exports = function (deployer) {
  deployer.deploy(DailyJournal, 1, 2, 3, "DailyJournal has been deployed!");
};