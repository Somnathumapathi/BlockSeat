import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("TokenTix", function () {
  describe("Deployment", () => {
    it('Naming', async () => {
      const TokenTix = await ethers.getContractFactory("TokenTix");
      const tokenTix = await TokenTix.deploy('TokenTix', 'TT');
      expect(await tokenTix.name()).to.equal("TokenTix");
    })
  })
  
});
