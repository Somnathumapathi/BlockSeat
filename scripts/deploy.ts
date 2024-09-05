import { ethers } from "hardhat";

const hre = require("hardhat")


async function main() {
    const TokenTix = await hre.ethers.getContractFactory("TokenTix")
    const tokenTix = await TokenTix.deploy()
    
    await tokenTix.deployed()
  
    console.log(tokenTix.address)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});