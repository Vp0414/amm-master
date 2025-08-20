require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const privateKeys = process.env.PRIVATE_KEYS || ""

module.exports = {
  solidity: "0.8.9",
  networks: {
    localhost: {},
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEYS}`,
      accounts: privateKeys.length > 0 ? privateKeys.split(",") : [] // safe fallback
    }
  },
};
