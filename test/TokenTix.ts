import { expect } from "chai";
import hre, { ethers } from "hardhat";

const name = "G.O.A.T"
const price = ethers.parseUnits('1', 'ether')
const noOfTickets = 100
const date = "Sept 5"
const time = "04:00AM CST"
const location = "Swagath Poornima, Bangalore"


describe("TokenTix", function () {
  let tokenTix : any;
  let owner : any;
  let buyer : any;
beforeEach(async () => {
  [owner, buyer] = await ethers.getSigners();
  const TokenTix = await ethers.getContractFactory("TokenTix");
  tokenTix = await TokenTix.deploy('TokenTix', 'TT');
  const createOcc = await tokenTix.connect(owner).createOccasion(name, price, noOfTickets, date, location, time)
  await createOcc.wait()
})

  describe("Deployment", () => {
    it('Init', async () => {      
      expect(await tokenTix.name()).to.equal("TokenTix");
      expect(await tokenTix.symbol()).to.equal("TT");
    })
    it('Owner', async () => {
      expect(await tokenTix.owner()).to.equal(owner.address);
    })
  })
  describe('Create Occasion', async () => {
    it('Create Occasion', async () => {
  expect(await tokenTix.occCount()).to.be.equal(1)
  const curOcc = await tokenTix.getOccasion(1)
  expect(curOcc.name).to.equal(name)
  expect(curOcc.price).to.equal(price)
  expect(curOcc.noOfTickets).to.equal(noOfTickets)
  expect(curOcc.date).to.equal(date)
  expect(curOcc.location).to.equal(location)
  expect(curOcc.time).to.equal(time)
  

  })
    
  })
  describe('Buy Ticket', async () => {
    beforeEach(async () => {
      const tprice = ethers.parseUnits('1', 'ether')
      const buyTicket = await tokenTix.connect(buyer).buyTicket(1, 1, {value : tprice})
      await buyTicket.wait()
    })
    it('Buy Ticket', async () => {
      const curOcc = await tokenTix.getOccasion(1)
      const hasBought = await tokenTix.hasTicket(1, buyer)
      expect(curOcc.noOfTickets).to.be.equal(100 - 1)
      expect(hasBought).to.be.equal(true)
    })})

  })

