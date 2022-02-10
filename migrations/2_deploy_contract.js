const DailyJournal = artifacts.require("DailyJournal");

module.exports = function (deployer) {
  deployer.deploy(
    DailyJournal, 
    "",
    "",
    "",
    "",
    "Tuesday", 
    "January 4th, 2022",
    7,
    ["5:45am", "10am", "3pm", "4pm", "5pm", "7pm", "8pm"], 
    ["10am", "3pm", "4pm", "5pm", "7pm", "8pm", "10pm"], 
    ["DailyJournal has been deployed!", "Added Udemy Course code repositories to my Github Account", "Added to my LinkedIn Profile", "Meditation", "Researched Coding Tutorials; Ethers.js vs. Web3.js", "Dinner", "Relax"]
  );
};