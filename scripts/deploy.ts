import { ethers } from "hardhat"

const hre = require("hardhat")

const tokens = (n : any) => {
  return ethers.parseUnits(n.toString(), 'ether')
}

async function main() {

  const [deployer] = await ethers.getSigners()

  const TokenTix = await ethers.getContractFactory("TokenTix")
  const tokenTix = await TokenTix.deploy("TokenTix", "TT")

  await tokenTix.waitForDeployment()

  console.log(`Deployed TokenTix Contract at: ${tokenTix.target}\n`)

  const occasions = [
    {
      name: "IPL finals",
      price: tokens(3),
      noOfTickets: 0,
      date: "May 31",
      time: "6:00PM IST",
      location: "Chinnaswamy Stadium"
    },
    {
      name: "G.O.A.T",
      price: tokens(1),
      noOfTickets: 125,
      date: "Jun 2",
      time: "1:00PM IST",
      location: "Swagath Poornima, Bangalore"
    },
    {
      name: "ETH India",
      price: tokens(0.25),
      noOfTickets: 200,
      date: "Jun 9",
      time: "10:00AM IST",
      location: "KTPO, Bangalore"
    },
    {
      name: "Mangalore-Ooty",
      price: tokens(5),
      noOfTickets: 0,
      date: "Jun 11",
      time: "2:30PM IST",
      location: "On road, South India"
    },
    {
      name: "ETH Global",
      price: tokens(1.5),
      noOfTickets: 125,
      date: "Jun 23",
      time: "11:00AM IST",
      location: "Somewhere, Chennai"
    }
  ]

  for (var i = 0; i < 5; i++) {
    const transaction = await tokenTix.connect(deployer).createOccasion(
      occasions[i].name,
      occasions[i].price,
      occasions[i].noOfTickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location,
    )

    await transaction.wait()

    console.log(`Event ${i + 1}: ${occasions[i].name}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
