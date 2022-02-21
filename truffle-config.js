require('@babel/register');
require('@babel/polyfill');
require("dotenv").config({path: "./.env"});

const HDWalletProvider = require("@truffle/hdwallet-provider");
const AccountIndex = 0;


module.exports = {
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  networks: {
    development: {
     host: "127.0.0.1",
     port: 7545,
     network_id: "*"
    },
    rinkeby_infura: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`, AccountIndex)
      },
      network_id: 4,
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
  },
  plugins: [
    'truffle-flatten'
  ]
};