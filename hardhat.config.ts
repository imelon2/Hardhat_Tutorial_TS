import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "dotenv"
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat:{},
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    }
    // goerli: {
    //   url:"", // JSON-RPC URL
      // accounts : process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    // }
  },
    etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
    // apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
