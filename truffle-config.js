require('babel-register');
require('babel-polyfill');

module.exports = {
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  networks: {
    development: {
     host: "127.0.0.1",
     port: 7545,
     network_id: "*"
    }
  },
  compilers: {
    solc: {
      version: "0.8.0",
      settings: {
       optimizer: {
         enabled: false,
         runs: 200
       }
      }
    }
  }
};