const DailyJournal = artifacts.require("DailyJournal");

module.exports = function (deployer) {
  deployer.deploy(DailyJournal, "Tuesday January 4th, 2022", "5:45am", "10am", "DailyJournal has been deployed!");
};